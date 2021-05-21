import prismaController from '../config/Database'
import { Request, Response } from 'express';
import expressValidator, { validationResult } from 'express-validator';
import { prisma } from '.prisma/client';
import bcrypt from 'bcrypt'

export const createClient = async (req:Request,res:Response) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            console.log("error body");
            res.status(400).json({errors:errors.array()})
        }
        //Obtain from the body
        const {email,fullname,password} = req.body;
        
        //Check if the email already exists in the database
        const userWithEmail =await prismaController.users.findUnique({
            where:{
                email: email
            }
        })
        if (userWithEmail)
        {
            
           return res.status(400).json({errors:[{msg:'Email already registered'}]})
        }
        //Password Encryption
        let encryptedPassword = await bcrypt.hash(password,10)
        //Creates a User in the database to associate with a Client register
        const user =await prismaController.users.create({data:{
            email:email,
            fullName:fullname,
            password:encryptedPassword,
            createdAt: new Date()
        }})
        //Creates a Client in the database based on the id of the user registered before
        await prismaController.clients.create({data:
        {
            userId:user.id
        }})

        res.json({msg:'Client added correctly'})
    }
    catch(err)
    {
        res.status(500).json({message:'Internal server error'})
        console.log(err);
    }
}
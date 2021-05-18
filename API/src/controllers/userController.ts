import prismaController from '../config/Database'
import { Request, Response } from 'express';
import expressValidator, { validationResult } from 'express-validator';
import { prisma } from '.prisma/client';


export const getAllUsers = async (req:Request,res:Response) =>{
    try
    {
        const allUsers = prismaController.users.findMany();
        res.status(200).json({users:allUsers})
    }
    catch(err)
    {
        res.status(500).json({message:'Internal server error'})
    }

}
export const createUser = async (req:Request,res:Response) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            console.log("error body");
            res.status(400).json({errors:errors.array()})
        }
        const {email,fullname,password} = req.body;

        //TODO: CHECK EMAIL
        //TODO: CHECK USER

        await prismaController.users.create({data:{
            email:email,
            fullName:fullname,
            password:password,
            createdAt: new Date()
        }})
        res.json({msg:'Added correctly'})



        // prismaController.users.create({data:{
        //     email: req.body.,

        // }
        // )
    }
    catch(err){
        res.status(500).json({message:'Internal server error'})
        console.log(err);
        
    }
}
import prismaController from '../config/Database'
import { Request, Response } from 'express';
import expressValidator, { validationResult } from 'express-validator';
import { prisma } from '.prisma/client';



export const findProducts = async (req:Request,res:Response)=>{
    try{
        const category = req.query.category as string
        const productName = req.query.productName as string
        
        //No category but has name
        if(category == 'All' && productName != null)
        { 
            const products = await prismaController.products.findMany({
                where:{
                    name:{
                        contains:productName
                    }
                }
            })
            res.json({products:products})
        }
        //Has Category and has name
        else if(category != 'All' && productName != null)
        {
            const products = await prismaController.products.findMany({
                where:{
                        name:{
                            contains:productName
                        },
                        Categories:{
                            name:{
                                equals:category
                            }
                        }
                },
                include:
                {
                    Categories:true  
                }
            })
            res.json({products:products})
        }
        // Has cateogry but does not has name
        else if(category != 'All' && productName == null)
        {
            const products = await prismaController.products.findMany({
                where:
                {
                    Categories:
                    {
                        name:{
                            equals:category
                        }
                    }
                },
                include:
                {
                    Categories:true
                }
               
            }) 
            res.json({products:products})
        }
        //No category and no name
        else{
            console.log("NoCat NoName");
            const products = await prismaController.products.findMany({})
            res.json({products:products})
        }
    }
    catch(err)
    {
        res.status(500).json({message:'Internal server error'})
    }
    
}
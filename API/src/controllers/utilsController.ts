import prismaController from '../config/Database'
import { Request, Response } from 'express';
import { prisma } from '.prisma/client';

export  const findSpecs = async (req:Request,res:Response) => 
{
    const specs= await prismaController.specifications.findMany({});
    return res.json({specs:specs})
}

export const findCategories = async (req:Request,res:Response) =>
{
    const catgs = await prismaController.categories.findMany({});
    return res.json({categories:catgs})
}


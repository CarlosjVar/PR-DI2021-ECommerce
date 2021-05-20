import express, { Request } from 'express'
import prismaController from '../config/Database'
import {findProducts} from '../controllers/productsController'

const productsRouter = express.Router();

productsRouter.route('/').get(
    () => 
    {
        console.log("Hola products");
    }
)
productsRouter.route('/create').post(()=>
{

}
)
productsRouter.route('/get').get([],findProducts)

export default productsRouter


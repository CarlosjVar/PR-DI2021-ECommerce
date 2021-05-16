import express from 'express'

const productsRouter = express.Router();

productsRouter.route('/').get(
    () => 
    {
        console.log("Hola products");
    }
)
export default productsRouter
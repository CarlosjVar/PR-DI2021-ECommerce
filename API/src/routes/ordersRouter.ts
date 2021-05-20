import express from 'express'

const ordersRouter = express.Router();

ordersRouter.route('/').get(
    () => 
    {
        console.log("Hola orders");
    }
)
export default ordersRouter
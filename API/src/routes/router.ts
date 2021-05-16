import express from 'express'
import productsRouter from './productsRouter'
import ordersRouter from './ordersRouter'
import usersRouter from './usersRouter'
const router = express()

router.use('/products',productsRouter);

router.use('/users',usersRouter);

router.use('/orders',ordersRouter);

export default router
import express from 'express';
import productsRouter from './productsRouter';
import ordersRouter from './ordersRouter';
import authRouter from './authRouter';
import clientsRouter from './clientsRouter';
import adminRouter from './adminRouter';
import utilsRouter from './utilsRouter';
import userRouter from './usersRouter';
import configRouter from './configRouter';

const router = express();

router.use('/products', productsRouter);

router.use('/auth', authRouter);

router.use('/orders', ordersRouter);

router.use('/clients', clientsRouter);

router.use('/admins', adminRouter);

router.use('/utils', utilsRouter);

router.use('/users', userRouter);

router.use('/config', configRouter);

export default router;

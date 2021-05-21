import express from 'express'
import expressValidator, { body, validationResult } from 'express-validator';
import isAuthenticated from '../middleware/isAuthenticated';
import { getCurrentAuth } from '../controllers/usersController';

const userRouter = express.Router();

userRouter.route('/current').get([isAuthenticated], getCurrentAuth)

export default userRouter;
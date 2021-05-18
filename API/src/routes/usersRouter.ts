import express from 'express'
import expressValidator, { body, validationResult } from 'express-validator';
import {
    createUser,
    getAllUsers} 
    from '../controllers/userController'
const usersRouter = express.Router();

usersRouter.route('/').get(getAllUsers)

usersRouter.route('/create').post(
    [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname')
    .isLength({min:10})
    .withMessage('Please enter a full name with a lenght at least 8 characters long'),
    body('password')
    .isStrongPassword()
    .withMessage('Please enter a stronger password')
    ],
    createUser)
export default usersRouter
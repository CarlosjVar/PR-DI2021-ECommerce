import express from 'express'
import expressValidator, { body, validationResult } from 'express-validator';
import {
    authUser
    } 
    from '../controllers/authenticationController'
const authRouter = express.Router();

// @route   POST - /api/auth/authUser
// @desc    Authenticates an user
// @access  Public
authRouter.route('/authUser').post(
    [
    body('email').isEmail().withMessage('Please enter an email'),
    body('password').notEmpty().withMessage('Please enter a password')
    ],
    authUser)
authRouter.route
export default authRouter

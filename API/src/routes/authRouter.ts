import express from 'express'
import expressValidator, { body, validationResult } from 'express-validator';
import {
    authUser
    } 
    from '../controllers/authenticationController'
const authRouter = express.Router();

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
authRouter.route('/authUser').post(
    [
    body('email').isEmail().withMessage('Please enter an email'),
    body('password').notEmpty().withMessage('Please enter a password')
    ],
    authUser)
authRouter.route
export default authRouter
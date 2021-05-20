import express from 'express'
import expressValidator, { body, validationResult } from 'express-validator';
import { createClient } from '../controllers/clientController';

const clientsRouter = express.Router();

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
clientsRouter.route('/').get((req,res)=>{console.log("Hola"); res.send("Hola");
})

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
clientsRouter.route('/create').post(
    [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname').isLength({min:10}).withMessage('Please enter a full name with a lenght at least 8 characters long'),
    body('password').isStrongPassword().withMessage('Please enter a stronger password')
    ],
    createClient)
export default clientsRouter
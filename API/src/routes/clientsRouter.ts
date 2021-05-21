import express from 'express'
import expressValidator, { body, validationResult } from 'express-validator';
import { createClient } from '../controllers/clientController';

const clientsRouter = express.Router();


// @route   POST - /api/clients/create
// @desc    Creates a client in the system
// @access  Public
clientsRouter.route('/create').post(
    [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname').isLength({min:10}).withMessage('Please enter a full name with a lenght at least 8 characters long'),
    body('password').isStrongPassword().withMessage('Please enter a stronger password')
    ],
    createClient)
export default clientsRouter
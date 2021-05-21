import express from 'express'
import expressValidator, { body, validationResult } from 'express-validator';
import isAuthenticatedAdmin from '../middleware/isAuthenticatedAdmin'
import {createAdmin, getAdmins} from '../controllers/adminController'
const adminRouter = express.Router();

// @route   POST - /api/admins/create
// @desc    Creates a user in the system
// @access  Only Admin
adminRouter.route('/create').post(
    [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname').isLength({min:10}).withMessage('Please enter a full name with a lenght at least 8 characters long'),
    body('password').isStrongPassword().withMessage('Please enter a stronger password'),
    isAuthenticatedAdmin
    ],
    createAdmin)


adminRouter.route('/get').get([isAuthenticatedAdmin],getAdmins)


adminRouter.route('/test').get(getAdmins)

export default adminRouter

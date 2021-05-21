import express, { Request } from 'express'
import prismaController from '../config/Database'
import {findCategories,findSpecs} from '../controllers/utilsController'

const utilsRouter = express.Router();

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
utilsRouter.route('/specs').get(findSpecs);

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
utilsRouter.route('/categories').get(findCategories);

export default utilsRouter;
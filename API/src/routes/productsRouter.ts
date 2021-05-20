import express, { Request } from 'express'
import prismaController from '../config/Database'
import {findProducts,createProduct} from '../controllers/productsController'
import isAuthenticatedAdmin from '../middleware/isAuthenticatedAdmin'
import expressValidator, { body, validationResult } from 'express-validator';
const productsRouter = express.Router();


productsRouter.route('/create').post(
    [body('nombre').isEmpty().withMessage('Please enter a name for the product'),
    body('cantidad').isEmpty().withMessage('Please enter the initial quantity'),
    body('precio').isEmpty().withMessage('Please enter an initial price'),
    body('specifications').isLength({min:1}).withMessage('Please enter at least one specification'),
    isAuthenticatedAdmin],
    createProduct
)

productsRouter.route('/get').get([],findProducts)

export default productsRouter


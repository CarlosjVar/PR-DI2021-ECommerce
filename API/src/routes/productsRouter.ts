import express, { Request } from "express";
import prismaController from "../config/Database";
import { findProducts, createProduct } from "../controllers/productsController";
import isAuthenticatedAdmin from "../middleware/isAuthenticatedAdmin";
import expressValidator, { body, validationResult } from "express-validator";
const productsRouter = express.Router();

// @route   POST - /api/products/create
// @desc    Creates a product in the system
// @access  Only Admin
productsRouter
  .route("/create")
  .post(
    [
      body("nombre")
        .isEmpty()
        .withMessage("Por favor ingrese un nombre para el producto"),
      body("cantidad")
        .isEmpty()
        .withMessage("Please enter the initial quantity"),
      body("precio")
        .isEmpty()
        .withMessage("Por favor ingrese un precio inicial"),
      body("specifications")
        .isLength({ min: 1 })
        .withMessage("Por favor ingrese al menos una especificación"),
      isAuthenticatedAdmin,
    ],
    createProduct
  );

// @route   GET - /api/products/get
// @desc    Gets all the products that matches the given parameters
// @access  Public
productsRouter.route("/get").get([], findProducts);

productsRouter.route("/delete").delete([isAuthenticatedAdmin]);
export default productsRouter;

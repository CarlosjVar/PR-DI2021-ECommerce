import express, { Request } from "express";
import prismaController from "../config/Database";
import {
  findProducts,
  createProduct,
  deleteProducts,
  updateProduct,
  findProduct,
  getTopProducts,
  pcBuilderProdSearch,
} from "../controllers/productsController";
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
      body("name")
        .notEmpty()
        .withMessage("Por favor ingrese un nombre para el producto"),
      body("quantity")
        .notEmpty()
        .withMessage("Por favor ingrese la cantidad en stock"),
      body("category")
        .notEmpty()
        .withMessage("Por favor ingrese una categoría"),
      body("price")
        .notEmpty()
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
productsRouter.route("/getAll").get([], findProducts);

// @route   DELETE - /api/products/delete
// @desc    Deletes a product based on an id sent
// @access  Public
productsRouter.route("/delete").delete([isAuthenticatedAdmin], deleteProducts);

productsRouter
  .route("/update")
  .put(
    [
      body("name")
        .notEmpty()
        .withMessage("Por favor ingrese un nombre para el producto"),
      body("quantity")
        .notEmpty()
        .withMessage("Por favor ingrese la cantidad en stock"),
      body("category")
        .notEmpty()
        .withMessage("Por favor ingrese una categoría"),
      body("price")
        .notEmpty()
        .withMessage("Por favor ingrese un precio inicial"),
      body("specifications")
        .isLength({ min: 1 })
        .withMessage("Por favor ingrese al menos una especificación"),
      isAuthenticatedAdmin,
    ],
    updateProduct
  );

productsRouter.route("/get/:id").get([], findProduct);

productsRouter
  .route("/getTopProducts")
  .get([isAuthenticatedAdmin], getTopProducts);

productsRouter
  .route("/pcBuilder/getProducts/:idcategoria/:idSpecification/:value")
  .get(pcBuilderProdSearch);

export default productsRouter;

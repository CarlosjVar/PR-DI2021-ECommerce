import express from "express";
import { body } from "express-validator";
import isAuthenticated from "../middleware/isAuthenticated";
import {
  addPreOrder,
  addSale,
  getOrder,
  getOrdersAdmin,
  getOrdersClient,
} from "../controllers/ordersController";
import isAuthenticatedAdmin from "../middleware/isAuthenticatedAdmin";

const ordersRouter = express.Router();

ordersRouter.route("/get/:id").get([isAuthenticated], getOrder);

// @route   GET - /api/orders/getOrdersAdmin
// @desc    get all orders in the system
// @access  private
ordersRouter
  .route("/getOrdersAdmin")
  .get([isAuthenticatedAdmin], getOrdersAdmin);

// @route   GET - /api/orders/getOrdersClient
// @desc    get all orders in the system corresponding to a client
// @access  private
ordersRouter.route("/getOrdersClient").get([isAuthenticated], getOrdersClient);

// @route   POST - /api/orders/createPreorder
// @desc    Creates a preorder in the system based on the items inside the shopping cart
// @access  private
ordersRouter
  .route("/createPreorder")
  .post(
    [
      isAuthenticated,
      body("cartProducts")
        .isLength({ min: 1 })
        .withMessage("Por favor agregue al menos un producto al carrito"),
    ],
    addPreOrder
  );
// @route   POST - /api/orders/createSale
// @desc    Creates a sale order in the system based on the items inside the shopping cart and the information given by paypal
// @access  private
ordersRouter
  .route("/createSale")
  .post(
    [
      isAuthenticated,
      body("cartProducts")
        .isLength({ min: 1 })
        .withMessage("Por favor agregue al menos un producto al carrito"),
      body("paypalOrderId")
        .notEmpty()
        .withMessage(
          "Identificador de orden de paypal faltante, comuníquese con un administrador si el dinero fue debitado de su cuenta"
        ),
      body("paypalOrderId")
        .notEmpty()
        .withMessage(
          "Identificador de cliente de paypal faltante, comuníquese con un administrador si el dinero fue debitado de su cuenta"
        ),
    ],
    addSale
  );
export default ordersRouter;

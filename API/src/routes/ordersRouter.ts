import express from "express";
import { body } from "express-validator";
import isAuthenticated from "../middleware/isAuthenticated";
import {
  addPreOrder,
  addSale,
  getOrdersAdmin,
  getOrdersClient,
} from "../controllers/ordersController";
import isAuthenticatedAdmin from "src/middleware/isAuthenticatedAdmin";

const ordersRouter = express.Router();

ordersRouter
  .route("/getOrdersAdmin")
  .get([isAuthenticatedAdmin], getOrdersAdmin);

ordersRouter.route("/").get((req, res) => {
  res.json("RUTA SIRVE");
});

// @route   GET - /api/orders/getOrdersClient
// @desc    get all orders in the system corresponding to a client
// @access  Public
ordersRouter.route("/getOrdersClient").get([isAuthenticated], getOrdersClient);

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

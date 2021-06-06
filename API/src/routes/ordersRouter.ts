import express from "express";
import { body } from "express-validator";
import isAuthenticated from "../middleware/isAuthenticated";
import { addPreOrder, addSale } from "../controllers/ordersController";

const ordersRouter = express.Router();

// @route   GET - /api/orders/
// @desc    get all orders in the system
// @access  Public
ordersRouter.route("/getOrders").get(() => {
  console.log("Hola orders");
});

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

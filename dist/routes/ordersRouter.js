"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const ordersController_1 = require("../controllers/ordersController");
const isAuthenticatedAdmin_1 = __importDefault(require("../middleware/isAuthenticatedAdmin"));
const ordersRouter = express_1.default.Router();
ordersRouter.route("/get/:id").get([isAuthenticated_1.default], ordersController_1.getOrder);
// @route   GET - /api/orders/getOrdersAdmin
// @desc    get all orders in the system
// @access  private
ordersRouter
    .route("/getOrdersAdmin")
    .get([isAuthenticatedAdmin_1.default], ordersController_1.getOrdersAdmin);
// @route   GET - /api/orders/getOrdersClient
// @desc    get all orders in the system corresponding to a client
// @access  private
ordersRouter.route("/getOrdersClient").get([isAuthenticated_1.default], ordersController_1.getOrdersClient);
// @route   POST - /api/orders/createPreorder
// @desc    Creates a preorder in the system based on the items inside the shopping cart
// @access  private
ordersRouter
    .route("/createPreorder")
    .post([
    isAuthenticated_1.default,
    express_validator_1.body("cartProducts")
        .isLength({ min: 1 })
        .withMessage("Por favor agregue al menos un producto al carrito"),
], ordersController_1.addPreOrder);
// @route   POST - /api/orders/createSale
// @desc    Creates a sale order in the system based on the items inside the shopping cart and the information given by paypal
// @access  private
ordersRouter
    .route("/createSale")
    .post([
    isAuthenticated_1.default,
    express_validator_1.body("cartProducts")
        .isLength({ min: 1 })
        .withMessage("Por favor agregue al menos un producto al carrito"),
    express_validator_1.body("paypalOrderId")
        .notEmpty()
        .withMessage("Identificador de orden de paypal faltante, comuníquese con un administrador si el dinero fue debitado de su cuenta"),
    express_validator_1.body("paypalOrderId")
        .notEmpty()
        .withMessage("Identificador de cliente de paypal faltante, comuníquese con un administrador si el dinero fue debitado de su cuenta"),
], ordersController_1.addSale);
ordersRouter
    .route("/updateStatus/:id")
    .put([isAuthenticatedAdmin_1.default], ordersController_1.updateStatus);
exports.default = ordersRouter;

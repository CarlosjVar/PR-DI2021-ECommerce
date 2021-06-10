"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getOrder = exports.getOrdersAdmin = exports.getOrdersClient = exports.addPreOrder = exports.addSale = void 0;
const Database_1 = __importDefault(require("../config/Database"));
const express_validator_1 = require("express-validator");
// @route   POST - /api/orders/createSale
// @desc    Creates a Sale based on the cart products and paypal confirmation data
// @access  private
const addSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Error validation
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Body data obtention
        const user = req.user;
        const body = req.body;
        if (!user.Clients) {
            return res.status(400).json({ msg: "User not registered as a client" });
        }
        const cartProducts = body.cartProducts;
        const { paypalOrderId, paypalPayerId } = body;
        //Structure creation
        let dbProducts = [];
        let noStockProds = [];
        // Product search on the database
        let productSearch = new Promise((resolve, rejects) => {
            cartProducts.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
                // Db query
                const dbProduct = yield Database_1.default.products.findUnique({
                    where: {
                        id: product.id,
                    },
                });
                // Identifying understock products
                if (dbProduct.quantity >= product.numberOfItems) {
                    dbProducts.push({ prod: dbProduct, quantity: product.numberOfItems });
                }
                else {
                    noStockProds.push({
                        productName: dbProduct.name,
                        availableStock: dbProduct.quantity,
                    });
                }
                resolve({ onStock: dbProducts, noStock: noStockProds });
            }));
        }).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            const dbProducts = result.onStock;
            const noStockProducts = result.noStock;
            console.log(dbProducts);
            console.log(noStockProducts);
            // If there is at least one product lacking stock the request ends and the order creation is aborted
            if (Object.keys(noStockProducts).length > 0) {
                return res.status(400).json({
                    msg: "No hay suficiente stock para realizar la orden",
                    products: noStockProducts,
                });
            }
            let orderDetails = [];
            let total = 0;
            //Getting data ready for order and order detail creation
            for (let key in dbProducts) {
                const prod = dbProducts[key];
                const prodId = prod.prod.id;
                const quantity = prod.quantity;
                const price = prod.prod.price;
                orderDetails.push({
                    id: prodId,
                    quantity: quantity,
                    price: price,
                });
                total += price * quantity;
                // Reducing available stock
                yield Database_1.default.products.update({
                    where: { id: prodId },
                    data: { quantity: prod.prod.quantity - quantity },
                });
            }
            //Order Creation
            total = total + total * 0.13;
            const order = yield Database_1.default.orders.create({
                data: {
                    clientId: user.Clients.id,
                    totalPrice: total,
                    createdAt: new Date(),
                    delivered: false,
                },
            });
            // TODO: SALE
            yield Database_1.default.sales.create({
                data: {
                    orderId: order.id,
                    paypalOrderId: paypalOrderId,
                    paypalPayerId: paypalPayerId,
                },
            });
            // Order Detail Insertion
            yield orderDetails.forEach((detail) => __awaiter(void 0, void 0, void 0, function* () {
                yield Database_1.default.orderDetails.create({
                    data: {
                        orderId: order.id,
                        productId: detail.id,
                        quantity: detail.quantity,
                        price: detail.price,
                    },
                });
            }));
            return res.json({
                msg: "Venta completada exitosamente",
                order: order,
                prodsOrder: orderDetails,
            });
        }));
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.addSale = addSale;
// @route   POST - /api/orders/createPreorder
// @desc    Creates a preorder based on the cart products
// @access  private
const addPreOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Error validation
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Body data obtention
        const user = req.user;
        const body = req.body;
        if (!user.Clients) {
            return res.status(400).json({ msg: "User not registered as a client" });
        }
        const cartProducts = body.cartProducts;
        let dbProducts = [];
        let noStockProds = [];
        // Product search on the database
        let productSearch = new Promise((resolve, rejects) => {
            cartProducts.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
                // Db query
                const dbProduct = yield Database_1.default.products.findUnique({
                    where: {
                        id: product.id,
                    },
                });
                // Identifying understock products
                if (dbProduct.quantity >= product.numberOfItems) {
                    dbProducts.push({ prod: dbProduct, quantity: product.numberOfItems });
                }
                else {
                    noStockProds.push({
                        productName: dbProduct.name,
                        availableStock: dbProduct.quantity,
                    });
                }
                resolve({ onStock: dbProducts, noStock: noStockProds });
            }));
        }).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            const dbProducts = result.onStock;
            const noStockProducts = result.noStock;
            // If there is at least one product lacking stock the request ends and the order creation is aborted
            if (Object.keys(noStockProducts).length > 0) {
                return res.status(400).json({
                    msg: "No hay suficiente stock para realizar la orden",
                    products: noStockProducts,
                });
            }
            let orderDetails = [];
            let total = 0;
            //Getting data ready for order and order detail creation
            for (let key in dbProducts) {
                const prod = dbProducts[key];
                const prodId = prod.prod.id;
                const quantity = prod.quantity;
                const price = prod.prod.price;
                orderDetails.push({
                    id: prodId,
                    quantity: quantity,
                    price: price,
                });
                total += price * quantity;
            }
            //Order Creation
            total = total + total * 0.13;
            const order = yield Database_1.default.orders.create({
                data: {
                    clientId: user.Clients.id,
                    totalPrice: total,
                    createdAt: new Date(),
                    delivered: false,
                },
            });
            // Preorder Creation
            yield Database_1.default.preorders.create({
                data: { orderId: order.id, isCancelled: false },
            });
            // Order Detail Insertion
            yield orderDetails.forEach((detail) => __awaiter(void 0, void 0, void 0, function* () {
                yield Database_1.default.orderDetails.create({
                    data: {
                        orderId: order.id,
                        productId: detail.id,
                        quantity: detail.quantity,
                        price: detail.price,
                    },
                });
            }));
            return res.json({
                msg: "Preorden creada exitosamente",
                prodsOrder: orderDetails,
                order: order,
            });
        }));
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.addPreOrder = addPreOrder;
const getOrdersClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Error validation
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = req.user;
        const orders = yield Database_1.default.orders.findMany({
            where: {
                clientId: user.Clients.id,
            },
        });
        return res.json({ msg: "Ordenes encontradas", orders: orders });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getOrdersClient = getOrdersClient;
const getOrdersAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Error validation
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const orders = yield Database_1.default.orders.findMany({});
        let ordersClient = [];
        for (let orden of orders) {
            const client = yield Database_1.default.users.findFirst({
                where: {
                    Clients: { id: orden.clientId },
                },
            });
            const order = {
                name: client.fullName,
                orderId: orden.id,
                fecha: orden.createdAt,
                monto: orden.totalPrice,
            };
            ordersClient.push(order);
        }
        res.json({ msg: "Ordenes encontradas", ordenes: ordersClient });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getOrdersAdmin = getOrdersAdmin;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const orderId = parseInt(req.params.id);
        const order = yield Database_1.default.orders.findFirst({
            where: { id: orderId },
            include: { Sales: true, Preorders: true, OrderDetails: true },
        });
        let productsInfo = [];
        for (let orderDetail of order.OrderDetails) {
            console.log(orderDetail);
            const product = yield Database_1.default.products.findFirst({
                where: {
                    id: orderDetail.productId,
                },
            });
            const productInfo = {
                name: product.name,
                productId: product.id,
                quantity: orderDetail.quantity,
                price: orderDetail.price,
                imageFileName: product.imageFileName,
            };
            productsInfo.push(productInfo);
        }
        if (req.user.Clients) {
            if (req.user.Clients.id != order.clientId) {
                return res
                    .status(400)
                    .json({ msg: "No autorizado para ver esta orden" });
            }
        }
        if (!order.Preorders) {
            delete order.Preorders;
        }
        else {
            delete order.Sales;
        }
        delete order.OrderDetails;
        const user = yield Database_1.default.users.findFirst({
            where: { Clients: { id: order.clientId } },
        });
        //Nombre cliente
        return res.json({
            msg: "Detalles de orden encontrados",
            cliente: { name: user.fullName },
            orden: order,
            detallesOrder: productsInfo,
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getOrder = getOrder;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const orderId = parseInt(req.params.id);
        if (req.body.entregado) {
            yield Database_1.default.orders.update({
                data: { delivered: req.body.entregado },
                where: { id: orderId },
            });
        }
        if (req.body.pagado) {
            const order = yield Database_1.default.orders.findFirst({
                where: { id: orderId },
                include: { Preorders: true, OrderDetails: true },
            });
            if (order.Preorders) {
                //FOR VERIFICATION
                if (order.Preorders.isCancelled) {
                    return res.json({ msg: "Esta orden ya se encuentra cancelada" });
                }
                //PRODUCT Stock REDUCTION
                let products = [];
                for (let orderDetail of order.OrderDetails) {
                    const product = yield Database_1.default.products.findFirst({
                        where: { id: orderDetail.productId },
                    });
                    products.push(product);
                }
                //Pending for optimization
                let contador = 0;
                for (let orderDetail of order.OrderDetails) {
                    if (orderDetail.quantity > products[contador].quantity) {
                        return res.status(400).json({
                            msg: "No hay stock suficiente para responder a esta preorden",
                        });
                    }
                    contador++;
                }
                for (let orderDetail of order.OrderDetails) {
                    yield Database_1.default.products.update({
                        where: { id: orderDetail.productId },
                        data: { quantity: { decrement: orderDetail.quantity } },
                    });
                }
                yield Database_1.default.preorders.update({
                    data: { isCancelled: req.body.pagado },
                    where: {
                        orderId: orderId,
                    },
                });
            }
        }
        return res.json({ msg: "Estado actualizado correctamente" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.updateStatus = updateStatus;

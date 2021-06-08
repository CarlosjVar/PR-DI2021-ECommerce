import prismaController from "../config/Database";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { resolve } from "path/posix";
import { rejects } from "assert/strict";
import ordersRouter from "src/routes/ordersRouter";

// @route   POST - /api/orders/createSale
// @desc    Creates a Sale based on the cart products and paypal confirmation data
// @access  private
export const addSale = async (req: Request, res: Response) => {
  try {
    // Error validation
    const errors = validationResult(req);
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
    let dbProducts: any = [];
    let noStockProds: any = [];

    // Product search on the database
    let productSearch = new Promise((resolve, rejects) => {
      cartProducts.forEach(async (product: any) => {
        // Db query
        const dbProduct = await prismaController.products.findUnique({
          where: {
            id: product.id,
          },
        });

        // Identifying understock products
        if (dbProduct.quantity >= product.numberOfItems) {
          dbProducts.push({ prod: dbProduct, quantity: product.numberOfItems });
        } else {
          noStockProds.push({
            productName: dbProduct.name,
            availableStock: dbProduct.quantity,
          });
        }
        resolve({ onStock: dbProducts, noStock: noStockProds });
      });
    }).then(async (result: any) => {
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
        await prismaController.products.update({
          where: { id: prodId },
          data: { quantity: prod.prod.quantity - quantity },
        });
      }

      //Order Creation
      total = total + total * 0.13;
      const order = await prismaController.orders.create({
        data: {
          clientId: user.Clients.id,
          totalPrice: total,
          createdAt: new Date(),
          delivered: false,
        },
      });
      // TODO: SALE
      await prismaController.sales.create({
        data: {
          orderId: order.id,
          paypalOrderId: paypalOrderId,
          paypalPayerId: paypalPayerId,
        },
      });

      // Order Detail Insertion
      await orderDetails.forEach(async (detail) => {
        await prismaController.orderDetails.create({
          data: {
            orderId: order.id,
            productId: detail.id,
            quantity: detail.quantity,
            price: detail.price,
          },
        });
      });

      return res.json({
        msg: "Venta completada exitosamente",
        order: order,
        prodsOrder: orderDetails,
      });
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
// @route   POST - /api/orders/createPreorder
// @desc    Creates a preorder based on the cart products
// @access  private
export const addPreOrder = async (req: Request, res: Response) => {
  try {
    // Error validation
    const errors = validationResult(req);
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
    let dbProducts: any = [];
    let noStockProds: any = [];

    // Product search on the database
    let productSearch = new Promise((resolve, rejects) => {
      cartProducts.forEach(async (product: any) => {
        // Db query
        const dbProduct = await prismaController.products.findUnique({
          where: {
            id: product.id,
          },
        });

        // Identifying understock products
        if (dbProduct.quantity >= product.numberOfItems) {
          dbProducts.push({ prod: dbProduct, quantity: product.numberOfItems });
        } else {
          noStockProds.push({
            productName: dbProduct.name,
            availableStock: dbProduct.quantity,
          });
        }
        resolve({ onStock: dbProducts, noStock: noStockProds });
      });
    }).then(async (result: any) => {
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
      const order = await prismaController.orders.create({
        data: {
          clientId: user.Clients.id,
          totalPrice: total,
          createdAt: new Date(),
          delivered: false,
        },
      });
      // Preorder Creation
      await prismaController.preorders.create({
        data: { orderId: order.id, isCancelled: false },
      });

      // Order Detail Insertion
      await orderDetails.forEach(async (detail) => {
        await prismaController.orderDetails.create({
          data: {
            orderId: order.id,
            productId: detail.id,
            quantity: detail.quantity,
            price: detail.price,
          },
        });
      });

      return res.json({
        msg: "Preorden creada exitosamente",
        prodsOrder: orderDetails,
        order: order,
      });
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const getOrdersClient = async (req: Request, res: Response) => {
  try {
    // Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.user;

    const orders = await prismaController.orders.findMany({
      where: {
        clientId: user.Clients.id,
      },
    });
    return res.json({ msg: "Ordenes encontradas", orders: orders });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getOrdersAdmin = async (req: Request, res: Response) => {
  try {
    // Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const orders = await prismaController.orders.findMany({});
    let ordersClient: any = [];
    for (let orden of orders) {
      const client: any = await prismaController.users.findFirst({
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
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const orderId = parseInt(req.params.id);
    const order = await prismaController.orders.findFirst({
      where: { id: orderId },
      include: { Sales: true, Preorders: true, OrderDetails: true },
    });

    let productsInfo = [];
    for (let orderDetail of order.OrderDetails) {
      console.log(orderDetail);
      const product = await prismaController.products.findFirst({
        where: {
          id: orderDetail.productId,
        },
      });
      const productInfo = {
        name: product.name,
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
    } else {
      delete order.Sales;
    }
    delete order.OrderDetails;
    const user = await prismaController.users.findFirst({
      where: { Clients: { id: order.clientId } },
    });
    //Nombre cliente
    return res.json({
      msg: "Detalles de orden encontrados",
      cliente: { name: user.fullName },
      orden: order,
      detallesOrder: productsInfo,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const orderId = parseInt(req.params.id);

    if (req.body.entregado) {
      await prismaController.orders.update({
        data: { delivered: req.body.entregado },
        where: { id: orderId },
      });
    }

    if (req.body.pagado) {
      const order = await prismaController.orders.findFirst({
        where: { id: orderId },
        include: { Preorders: true, OrderDetails: true },
      });
      if (order.Preorders) {
        await prismaController.preorders.update({
          data: { isCancelled: req.body.pagado },
          where: {
            orderId: orderId,
          },
        });

        //PRODUCT Stock REDUCTION
        for (let orderDetail of order.OrderDetails) {
          console.log(orderDetail);
          const product = await prismaController.products.update({
            where: { id: orderDetail.productId },
            data: {
              quantity: { increment: -orderDetail.quantity },
            },
          });
        }
      }
    }
    res.json({ msg: "Estado actualizado correctamente" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ msg: "Internal server error" });
  }
};

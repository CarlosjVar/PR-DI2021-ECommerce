import prismaController from "../config/Database";
import { Request, Response } from "express";
import expressValidator, {
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import { prisma } from ".prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { constants } from "buffer";

export const findProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const productName = req.query.productName as string;

    //No category but has name
    if (category == "All" && productName != null) {
      const products = await prismaController.products.findMany({
        where: {
          name: {
            contains: productName,
          },
        },
      });
      res.json({ products: products });
    }
    //Has Category and has name
    else if (category != "All" && productName != null) {
      const products = await prismaController.products.findMany({
        where: {
          name: {
            contains: productName,
          },
          Categories: {
            name: {
              equals: category,
            },
          },
        },
        include: {
          Categories: true,
        },
      });
      res.json({ products: products });
    }
    // Has cateogry but does not has name
    else if (category != "All" && productName == null) {
      const products = await prismaController.products.findMany({
        where: {
          Categories: {
            name: {
              equals: category,
            },
          },
        },
        include: {
          Categories: true,
        },
      });
      res.json({ products: products });
    }
    //No category and no name
    else {
      const products = await prismaController.products.findMany({});
      res.json({ products: products });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("Llegó");

    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, quantity, price, category, specifications } = req.body;

    const product = await prismaController.products.create({
      data: {
        name: name,
        quantity: quantity,
        price: price,
        createdAt: new Date(),
        categoryId: category as number,
      },
    });
    await specifications.forEach(async (specification: any) => {
      console.log(specification);

      await prismaController.productsXSpecifications.create({
        data: {
          productId: product.id as number,
          specificationId: specification.id as number,
          value: specification.value as string,
        },
      });
    });

    product.price = price as Decimal;
    return res.json({
      msg: "Producto añadido correctamente",
      productInfo: product,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ msg: [{ errors: "Internal server error" }] });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const prodId = parseInt(req.query.prodId as string);

    if (prodId == null) {
      return res
        .status(400)
        .json({ msg: [{ errors: "No se encontró el producto" }] });
    }

    await prismaController.productsXSpecifications.deleteMany({
      where: {
        productId: prodId as unknown as number,
      },
    });

    const product = await prismaController.products.delete({
      where: {
        id: prodId as unknown as number,
      },
    });
    res.json({
      msg: "El producto se ha eliminado correctamente",
      productInfo: product,
    });
  } catch (err) {
    res.status(500).json({ msg: [{ errors: "Internal server error" }] });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const prodId = parseInt(req.query.productId as string);
    if (!prodId) {
      return res
        .status(400)
        .json({ msg: [{ errors: "Error en el id del producto" }] });
    }
    const { name, quantity, price, category, specifications } = req.body;

    //Find new category id

    const product = await prismaController.products.update({
      where: {
        id: prodId as number,
      },
      data: {
        name: name,
        quantity: quantity,
        price: price,
        createdAt: new Date(),
        categoryId: category as number,
      },
    });
    //Delete all current relationships with specifications
    await prismaController.productsXSpecifications.deleteMany({
      where: {
        productId: prodId,
      },
    });

    //Insert the new specifications
    await specifications.forEach(async (specification: any) => {
      await prismaController.productsXSpecifications.create({
        data: {
          productId: product.id as number,
          specificationId: specification.id as number,
          value: specification.value as string,
        },
      });
    });

    return res.json({
      msg: "Se ha actualizado el producto correctamente",
      productInfo: product,
    });
  } catch (err) {
    console.log(err);

    res.json({ msg: [{ errors: "Internal server error" }] });
  }
};

export const findProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) {
      return res
        .status(400)
        .json({ msg: [{ errors: "Error en el id del producto" }] });
    }

    const product = await prismaController.products.findFirst({
      where: {
        id: productId,
      },
      include: {
        ProductsXSpecifications: true,
      },
    });

    const categoria = await prismaController.categories.findMany({
      where: {
        id: product.categoryId,
      },
    });
    return res.json({ product: product, categoria: categoria });
  } catch (err) {
    console.log(err);

    res.json({ msg: [{ errors: "Internal server error" }] });
  }
};

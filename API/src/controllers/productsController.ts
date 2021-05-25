import prismaController from "../config/Database";
import { Request, Response } from "express";
import expressValidator, {
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import { prisma } from ".prisma/client";

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
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, quantity, price, category, specifications } = req.body;
    const categoryRecord = await prismaController.categories.findFirst({
      where: {
        name: category,
      },
    });
    const product = await prismaController.products.create({
      data: {
        name: name,
        quantity: quantity,
        price: price,
        createdAt: Date(),
        categoryId: categoryRecord?.id as number,
      },
    });
    const specInsertion = await specifications.forEach(
      async (specification: any) => {
        let specificationRecord =
          await prismaController.specifications.findFirst({
            where: {
              name: specification.name as string,
            },
          });

        prismaController.productsXSpecifications.create({
          data: {
            productId: product.id as number,
            specificationId: specificationRecord?.id as number,
            value: specification.value,
          },
        });
      }
    );
    res.json({ msg: "Producto añadido correctamente" });
  } catch (err) {
    res.status(500).json({ msg: [{ errors: "Internal server error" }] });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const prodId = req.query.id;

    if (prodId == null) {
      res.status(400).json({ msg: [{ errors: "No se encontró el producto" }] });
    }

    prismaController.productsXSpecifications.deleteMany({
      where: {
        id: prodId as unknown as number,
      },
    });
    prismaController.products.delete({
      where: {
        id: prodId as unknown as number,
      },
    });
    res.json({
      msg: [{ errors: "El producto se ha eliminado correctamente" }],
    });
  } catch (err) {
    res.status(500).json({ msg: [{ errors: "Internal server error" }] });
  }
};

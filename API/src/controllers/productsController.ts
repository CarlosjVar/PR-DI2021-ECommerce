import prismaController from '../config/Database';
import { Request, Response } from 'express';
import expressValidator, {
  Result,
  ValidationError,
  validationResult,
} from 'express-validator';
import { Decimal } from '@prisma/client/runtime';
import { Products } from '@prisma/client';

export const findProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const productName = req.query.productName as string;
    let productsBase;
    //No category but has name
    if (category == 'All' && productName != null) {
      productsBase = await prismaController.products.findMany({
        where: {
          name: {
            contains: productName,
          },
        },
        include: {
          Categories: true,
          ProductsXSpecifications: {
            include: { Specifications: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    //Has Category and has name
    else if (category != 'All' && productName != null) {
      productsBase = await prismaController.products.findMany({
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
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Categories: true,
          ProductsXSpecifications: {
            include: { Specifications: true },
          },
        },
      });
    }
    // Has cateogry but does not has name
    else if (category != 'All' && productName == null) {
      productsBase = await prismaController.products.findMany({
        where: {
          Categories: {
            name: {
              equals: category,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Categories: true,
          ProductsXSpecifications: {
            include: { Specifications: true },
          },
        },
      });
    }
    //No category and no name
    else {
      productsBase = await prismaController.products.findMany({
        include: {
          Categories: true,
          ProductsXSpecifications: {
            include: { Specifications: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    let products: any = [];
    for (let product of productsBase) {
      let specs: any = [];
      const specification =
        await prismaController.productsXSpecifications.findMany({
          where: { productId: product.id },
          include: { Specifications: true },
        });
      for (let spec of specification) {
        let spect = await {
          id: spec.Specifications.id,
          name: spec.Specifications.name,
          value: spec.value,
        };
        specs.push(spect);
      }
      let prod = {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        categoryId: product.categoryId,
        imageFileName: product.imageFileName,
        createdAt: product.createdAt,
        Categories: product.Categories,
        Specifications: specs,
      };
      products.push(prod);
    }
    res.json({ products: products });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, quantity, price, category, specifications, imageName } =
      req.body;

    const product = await prismaController.products.create({
      data: {
        name: name,
        quantity: quantity,
        price: price,
        createdAt: new Date(),
        categoryId: category as number,
        imageFileName: imageName,
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
      msg: 'Producto añadido correctamente',
      productInfo: product,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ msg: [{ errors: 'Internal server error' }] });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const prodId = parseInt(req.query.prodId as string);

    if (prodId == null) {
      return res
        .status(400)
        .json({ msg: [{ errors: 'No se encontró el producto' }] });
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
      msg: 'El producto se ha eliminado correctamente',
      productInfo: product,
    });
  } catch (err) {
    res.status(500).json({ msg: [{ errors: 'Internal server error' }] });
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
        .json({ msg: [{ errors: 'Error en el id del producto' }] });
    }
    const { name, quantity, price, category, specifications, imageName } =
      req.body;

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
        imageFileName: imageName,
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
      msg: 'Se ha actualizado el producto correctamente',
      productInfo: product,
    });
  } catch (err) {
    console.log(err);

    res.json({ msg: [{ errors: 'Internal server error' }] });
  }
};

export const findProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    if (!productId) {
      return res
        .status(400)
        .json({ msg: [{ errors: 'Error en el id del producto' }] });
    }

    const product = await prismaController.products.findFirst({
      where: {
        id: productId,
      },
      include: {
        ProductsXSpecifications: true,
      },
    });
    if (!product) {
      return res.status(400).json({
        msg: 'No se encuentra un producto con concuerde con la información brindada',
      });
    }
    const categoria = await prismaController.categories.findMany({
      where: {
        id: product.categoryId,
      },
    });
    return res.json({ product: product, categoria: categoria });
  } catch (err) {
    console.log(err);

    res.json({ msg: [{ errors: 'Internal server error' }] });
  }
};

export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const prodLimit = 8;
    const prods = await prismaController.$queryRaw(
      ' SELECT t.* from (Select count(*) as count , Products.name, Products.id FROM Orders' +
        ' INNER JOIN OrderDetails on (Orders.id = OrderDetails.orderId) ' +
        'INNER JOIN Products on (OrderDetails.productId = Products.id) group by name) t order by (t.count ) desc limit ' +
        prodLimit
    );
    res.json({ prods: prods });
  } catch (err) {
    console.log(err);

    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const pcBuilderProdSearch = async (req: Request, res: Response) => {
  try {
    const idcategoria = parseInt(req.params.idcategoria);
    const idSpecification = parseInt(req.params.idSpecification);
    const value = req.params.value;

    const products = await prismaController.productsXSpecifications.findMany({
      where: {
        specificationId: idSpecification,
        value: value,
        Products: { categoryId: idcategoria },
      },

      select: {
        Products: true,
        value: true,
        Specifications: true,
      },
    });
    let cleanedProducts: any = [];
    for (let prod of products) {
      const specification =
        await prismaController.productsXSpecifications.findMany({
          where: { productId: prod.Products.id },
          include: { Specifications: true },
        });
      const category = await prismaController.categories.findUnique({
        where: { id: prod.Products.categoryId },
      });
      let specs = [];
      for (let spec of specification) {
        let spect = await {
          id: spec.Specifications.id,
          name: spec.Specifications.name,
          value: spec.value,
        };
        specs.push(spect);
      }
      const product = {
        id: prod.Products.id,
        name: prod.Products.name,
        quantity: prod.Products.quantity,
        price: prod.Products.price,
        categoryId: prod.Products.categoryId,
        Categories: category,
        imageFileName: prod.Products.imageFileName,
        createdAt: prod.Products.createdAt,
        Specifications: specs,
      };
      cleanedProducts.push(product);
    }
    res.json({ prods: cleanedProducts });
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

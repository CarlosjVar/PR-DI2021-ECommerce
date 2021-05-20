import express, { Request, Response } from 'express';
import prismaController from '../config/Database';

const productsRouter = express.Router();

productsRouter.route('/').get(() => {
  console.log('Hola products');
});
productsRouter.route('/create').post(() => {});
productsRouter.route('/get').get((req: Request, res: Response) => {
  const { category, productname } = req.params;

  if (category == 'All' && productname != null) {
    prismaController.products.findMany({
      where: {
        name: productname,
      },
    });
  } else if (category != 'All' && productname != null) {
    prismaController.products.findMany({
      where: {
        name: productname,
      },
      include: {
        Categories: true,
      },
    });
  }
});
export default productsRouter;

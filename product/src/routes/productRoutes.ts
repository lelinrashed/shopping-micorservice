import { createProduct, getProducts } from '../controllers/productController';
import express from 'express';

const productRoutes = () => {
  const router = express.Router();

  router.get('/products', getProducts);
  router.post('/delete-cache', createProduct);

  return router;
};

export default productRoutes;

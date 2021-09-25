import express from 'express';
const router = express.Router();
import {
  getFarmers,
  getFarmer,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/products.js';

router.get('/', getFarmers);
router.get('/:id', getFarmer);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
//router.get('/orders',.getOrders)

export default router;

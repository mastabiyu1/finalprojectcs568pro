import express from 'express';
const router = express();
import {
  getCustomers,
  getFarmers,
  updateReputationPts,
  getReputationPts,
  updateCustomer,
  updateFarmer,
  getFarmer,
  getUsers,
} from '../controller/users.js';

router.patch('/farmers/:id', updateReputationPts);
router.get('/farmers/:id', getReputationPts);

// router.get('/transactions', getTransactions);
// router.get('/log', getTransactions);

router.get('/', getUsers);
router.get('/farmers', getFarmers);
router.get('/customers', getCustomers);
router.patch('/customer/:id', updateCustomer);
router.patch('/farmer/:id', updateFarmer);
router.get('/farmer/:id', getFarmer);

export default router;

// router.get('/', getFarmers);
// router.get('/:id', getFarmer);
// router.post('/', createProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

import { getDatabase } from '../mongodb/mongoClient.js';
let id = 1;
export const signUpCustomer = (req, res, next) => {
  const customerInfo = {
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
    email: req.body.email,
    id: id,
    status: 'active',
    orders: [],
    // orders: [{name: 'tomato', price: 2, customerId: 1, status: "pending"}]
    role: 'customer',
    review: [],
  };
  id++;
  const db = getDatabase();
  db.collection('users')
    .insertOne(customerInfo)
    .then(() => res.json('Customer Added'))
    .catch();
};

export const signUpFarmer = (req, res, next) => {
  const farmerInfo = {
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    id: id,
    status: 'active',
    orders: [],
    products: [],
    role: 'farmer',
    reputationPts: 0,
  };
  id++;
  const db = getDatabase();
  db.collection('users')
    .insertOne(farmerInfo)
    .then(res.json('Farmer Added'))
    .catch();
};

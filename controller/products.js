import { getDatabase } from '../mongodb/mongoClient.js';

export const getFarmer = (req, res, next) => {
  const db = getDatabase();
  db.collection('users')
    .find({ id: Number(req.params.id) }, { product: 1 })
    .toArray()
    .then((product) => res.json(product))
    .catch();
};

export const getFarmers = (req, res, next) => {
  const db = getDatabase();
  db.collection('users')
    .find({ role: 'farmer' }, { product: 1 })
    .toArray()
    .then((product) => res.json(product))
    .catch();
};
let id = 1;

export const createProduct = (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    status: '',
  };
  id++;
  const db = getDatabase();

  db.collection('users')
    .insertOne(product)
    .then(() => res.json({ status: 'product' }))
    .catch();
};

export const updateProduct = (req, res, next) => {
  const id = Number(req.params.id);
  const product = req.body;
  const db = getDatabase();

  db.collection('users')
    .updateOne(
      { id: id },
      { $set: { product: { id: localStorage.getItem('id') } } }
    )
    .then(() => res.json({ status: 'product updated' }))
    .catch();
};

export const deleteProduct = (req, res, next) => {
  const id = Number(req.params.id);

  const db = getDatabase();

  db.collection('users')
    .deletOne(
      { id: id },
      { $pull: { product: { id: localStorage.getItem('id') } } }
    )
    .then(() => res.json({ status: 'product deleted' }))
    .catch();
};

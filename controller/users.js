import { getDatabase } from '../mongodb/mongoClient.js';

export const getReputationPts = (req, res) => {
  const farmerId = Number(req.params.id);
  console.log(farmerId);
  const db = getDatabase();
  db.collection('users')
    .find({ id: farmerId })
    .toArray()
    .then((users) => {
      console.log(users);
      const points = users[0].reputationPts;
      res.json({ points });
    })
    .catch((err) => console.log(err));
};
export const updateReputationPts = (req, res) => {
  const farmerId = Number(req.params.id);
  let newReputationPt = Number(req.body.reputationPts);
  const db = getDatabase();

  db.collection('users')
    .updateOne({ id: farmerId }, { $set: { reputationPts: newReputationPt } })
    .then((users) => {
      console.log(users);
      res.json({ status: 'points updated' });
    })
    .catch((err) => console.log(err));
};

export const authorizeUsers = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401).json();
  }
  jwt.verify(token, 'ThIs-iS-sEcrEt-kEY', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const authorizeSuperUsers = (req, res, next) => {
  if (req.user.role == 'superUser') {
    next();
  } else {
    res.sendStatus(403);
  }
};
//Mastawal
export const updateCustomer = (req, res) => {
  const customer = req.body;
  const id = Number(req.params.id);
  const db = getDatabase();
  db.collection('users')
    .updateOne({ id: id }, { $set: customer })
    .then(() => res.json('Customer updated'))
    .catch((err) => console.log(err));
};
export const updateFarmer = (req, res) => {
  const farmer = req.body;
  const id = Number(req.params.id);
  const db = getDatabase();
  db.collection('users')
    .updateOne({ id: id }, { $set: farmer })
    .then((item) => {
      res.json('User updated');
    })
    .catch((err) => console.log(err));
};
export const getFarmers = (req, res) => {
  const db = getDatabase();
  db.collection('users')
    .find({ role: 'farmer' })
    .sort({ reputationPts: 1 })
    .toArray()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};
export const getFarmer = (req, res) => {
  const id = Number(req.params.id);
  const db = getDatabase();
  db.collection('users')
    .find({ id: id })
    .toArray()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};
export const getCustomers = (req, res) => {
  const db = getDatabase();
  db.collection('users')
    .find({ role: 'customer' })
    .toArray()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};
let id = 1;

export const getUsers = (req, res) => {
  const db = getDatabase();
  db.collection('users')
    .find({ role: { $nin: ['superuser'] } })
    .toArray()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

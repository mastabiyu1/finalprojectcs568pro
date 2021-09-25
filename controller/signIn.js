import { getDatabase } from '../mongodb/mongoClient.js';
import jwt from 'jsonwebtoken';

export const signIn = (req, res) => {
  const userInfo = { username: req.body.username };
  const db = getDatabase();
  db.collection('users')
    .find(userInfo)
    .toArray()
    .then((user) => {
      console.log(user);
      if (
        user[0].username === req.body.username &&
        user[0].password == req.body.password
      ) {
        const userSig = { username: user[0].username, role: user[0].role };
        const token = jwt.sign(userSig, 'ThIs-iS-sEcrEt-kEY');
        res.json({ token: token, role: user[0].role, id: user[0].id });
      } else {
        res.json({ status: 'error' });
      }
    })
    .catch((err) => console.log(err));
};

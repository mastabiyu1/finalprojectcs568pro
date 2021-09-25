import { MongoClient } from 'mongodb';

let database;
const mongoConnect = (appListen) => {
  const url = "mongodb://localhost:27017" 
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
      database = client.db(`farmers-market`);
      appListen();
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const getDatabase = () => {
  if (database) return database;
  return 'Database Not Connected';
};

export { mongoConnect, getDatabase };

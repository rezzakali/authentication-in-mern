// external imports
import mongoose from 'mongoose';

const connectionToDb = async () => {
  mongoose
    .connect(`${process.env.DB_CONNECTION_URL}/${process.env.DB_NAME}`)
    .then(() => {
      console.log('Database connection successfully!');
    })
    .catch(() => {
      console.log('Database connection failed!');
    });
};

export default connectionToDb;

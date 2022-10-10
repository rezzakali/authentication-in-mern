// external emports
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// internal imports
import connectionToDb from './config/dbConnection.js';
import userHandler from './handler/userHandler.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// environment and database config
dotenv.config();
connectionToDb();

// call the app object
const app = express();

// cors policy
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// cookie-parser
app.use(cookieParser());

// json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// router
app.use('/user', userHandler);

// error handler
app.use(errorMiddleware);

// listening the server
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});

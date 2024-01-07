import express from 'express';
import routes from './routes/index';
import { json, urlencoded } from 'body-parser';
import { errorMiddleware } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

export { app, server };

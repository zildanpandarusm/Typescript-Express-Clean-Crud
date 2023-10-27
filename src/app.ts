import express from 'express';
import userRoutes from './routes/index';
import { json, urlencoded } from 'body-parser';
import { errorMiddleware } from './middleware/errorMiddleware';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/v1', userRoutes);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Server berjalan di port 3000');
});

export default app;

import express from 'express';
import userRoutes from './routes/index';
import { json, urlencoded } from 'body-parser';

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use('/v1', userRoutes);

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});

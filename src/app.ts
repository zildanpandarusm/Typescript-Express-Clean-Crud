import express from 'express';
import userRoutes from './routes/index';
import { json, urlencoded } from 'body-parser';
import { errorMiddleware } from './middleware/errorMiddleware';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(json());
app.use(fileUpload());
app.use(urlencoded({ extended: true }));
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

app.use('/v1', userRoutes);
app.use(errorMiddleware);

export default app;

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

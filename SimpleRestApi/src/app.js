import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/product.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors({
    origin: 'http://127.0.0.1:5501'
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/products', productRoutes);

export default app;

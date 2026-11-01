import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes.js'; 
import productRoutes from './routes/product.routes.js'; 

const app = express();

app.use(cors()); 
app.use(express.json());

// Mount rest endpoints cleanly
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Establish pathing resolution variables safely
const frontendBuildPath = path.resolve('../react-frontend/dist');
app.use(express.static(frontendBuildPath));

// Named wildcard fallback handler matching Express requirements
app.get('/*any', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

export default app;

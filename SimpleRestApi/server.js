import app from './src/app.js';
import { connectDB } from './src/config/database.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // 1. Establish the secure connection to MongoDB Atlas first
        await connectDB();

        // 2. Only spin up the network listener once the DB handshake is complete
        app.listen(PORT, () => {
            console.log(`🚀 Server successfully listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Server startup aborted: Failed to initialize MongoDB Atlas connection.', error);
        process.exit(1);
    }
}

startServer();

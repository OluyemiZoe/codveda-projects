import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb+srv://zoeinspired1609_db_user:ZoeAtlasPass123@cluster0.mnouqmn.mongodb.net/';

const client = new MongoClient(url);

const dbName = 'SimpleRestApi';
let dbConnection = null;

export async function connectDB() {
  if (dbConnection) return dbConnection;

  try {
    await client.connect();
    console.log(' Successfully connected to MongoDB Atlas Cloud Cluster!');
    dbConnection = client.db(dbName);
    return dbConnection;
  } catch (error) {
    console.error(' MongoDB Atlas connection failed:', error);
    throw error;
  }
}

export function getCollection(collectionName) {
  if (!dbConnection) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return dbConnection.collection(collectionName);
}

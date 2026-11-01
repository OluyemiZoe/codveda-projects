import { getCollection } from '../config/database.js';
import { ObjectId } from 'mongodb';

class ProductModel {
    /**
     * Pull all products from your MongoDB Atlas cluster collection
     */
    static async getAll() {
        try {
            const productCollection = getCollection('products');
            const data = await productCollection.find({}).toArray();
            // Force an array output layout even if the remote collection is entirely empty
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Database tier find crash:', error);
            return [];
        }
    }

    /**
     * Look up a single product item by its cloud ObjectId reference
     */
    static async getById(id) {
        const productCollection = getCollection('products');
        try {
            return await productCollection.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            return null;
        }
    }

    /**
     * Create and insert a real document into MongoDB Atlas
     */
    static async create(productData) {
        const productCollection = getCollection('products');
        const newProduct = {
            ...productData,
            createdAt: new Date()
        };
        const result = await productCollection.insertOne(newProduct);
        return { _id: result.insertedId, ...newProduct };
    }

    /**
     * Modify a product document directly inside Atlas
     */
    static async update(id, updatedData) {
        const productCollection = getCollection('products');
        try {
            const result = await productCollection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updatedData },
                { returnDocument: 'after' }
            );
            return result;
        } catch (error) {
            return null;
        }
    }

    /**
     * Delete a product document from MongoDB Atlas using its unique string coordinate
     */
    static async delete(id) {
        const productCollection = getCollection('products');
        try {
            const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
            return result.deletedCount > 0;
        } catch (error) {
            console.error('Database tier deletion crash:', error);
            return false;
        }
    }
}

export default ProductModel;

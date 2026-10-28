import ProductService from '../services/product.service.js';

const handleErrors = (res, error) => {
    if (error.message === 'NOT_FOUND') return res.status(404).json({ error: 'Product not found.' });
    if (error.message === 'INVALID_INPUT') return res.status(400).json({ error: 'Missing fields.' });
    return res.status(500).json({ error: 'Internal Server Error' });
};

class ProductController {
    static getAll(req, res) {
        try {
            res.status(200).json(ProductService.getAllProducts());
        } catch (error) {
            handleErrors(res, error);
        }
    }

    static getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.status(200).json(ProductService.getProductById(id));
        } catch (error) {
            handleErrors(res, error);
        }
    }

    static create(req, res) {
        try {
            res.status(201).json(ProductService.createProduct(req.body));
        } catch (error) {
            handleErrors(res, error);
        }
    }

    static update(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.status(200).json(ProductService.updateProduct(id, req.body));
        } catch (error) {
            handleErrors(res, error);
        }
    }

    static delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            ProductService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            handleErrors(res, error);
        }
    }
}

export default ProductController;

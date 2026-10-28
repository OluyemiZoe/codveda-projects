let products = [
    { id: 1, name: 'Wireless Mouse', price: 29.99, stock: 15 },
    { id: 2, name: 'Mechanical Keyboard', price: 5000.00, stock: 10 }
];

class ProductModel {
    static getAll() {
        return products;
    }

    static getById(id) {
        return products.find(p => p.id === id);
    }

    static create(productData) {
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            ...productData
        };
        products.push(newProduct);
        return newProduct;
    }

    static update(id, updatedData) {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return undefined;
        products[index] = { id, ...updatedData };
        return products[index];
    }

    static delete(id) {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return false;
        products.splice(index, 1);
        return true;
    }
}

export default ProductModel;

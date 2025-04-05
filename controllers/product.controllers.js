import * as service from '../services/product.services.js';

export const createProduct = async (req, res, next) => {
    try {
        const product = await service.createProduct(req.body);
        res.status(201).json(product);
    } catch (error){
        next(error);
    }
};
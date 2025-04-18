import * as service from "../services/product.services.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
export const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      priceMin,
      priceMax,
      nameSort,
      priceSort,
      discountSort,
    } = req.query;
    const products = await service.getProducts({
      page,
      limit,
      search,
      priceMin,
      priceMax,
      nameSort,
      priceSort,
      discountSort,
    });
    res.json({ products, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

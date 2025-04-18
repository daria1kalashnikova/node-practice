import Product from "../db/models/product.js";

export const createProduct = async (product) => {
  return Product.create(product);
};

export const getProducts = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const products = Product.findAll({
    offset,
    limit: Number(limit),
  });
  return products;
};

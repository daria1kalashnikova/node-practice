import Product from "../db/models/product.js";

export const createProduct = async (product) => {
  return Product.create(product);
};

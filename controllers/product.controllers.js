import fs from "node:fs/promises";
import path from "node:path";
import createError from "http-errors";
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

export const updateProduct = async (req, res, next) => {
  if (!req.file) {
    throw createError(400, "File is requered");
  }

  const oldPath = req.file.path;
  const newPath = path.resolve("public", "products", req.file.filename);
  await fs.rename(oldPath, newPath);

  const productUrlPath = "/products/" + req.file.filename;
  await service.updateProduct(req.params.id, {
    productImage: productUrlPath,
  });
  //   console.log("ok");
  // res.json("ok");
  res.json({ message: "Successfully", productImage: productUrlPath });
};

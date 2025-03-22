import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const productsPath = path.resolve("src", "db", "products.json");

export const addProduct = async (data = {}) => {
  const newProduct = {
    id: nanoid(),
    ...data,
  };
  const productsJson = await fs.readFile(productsPath, "utf-8");
  const products = JSON.parse(productsJson);
  products.push(newProduct);
  fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  return newProduct;
};

addProduct();

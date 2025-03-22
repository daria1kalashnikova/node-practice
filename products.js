import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const productsPath = path.resolve("src", "db", "products.json");

export const writeFile = async (products) => {
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
};

export const getProducts = async () => {
  const productsJson = await fs.readFile(productsPath, "utf-8");
  const products = JSON.parse(productsJson);

  return products;
};

export const addProduct = async ({ title, price }) => {
  const newProduct = {
    id: nanoid(),
    title,
    price,
    discount: 0,
  };

  const products = await getProducts();

  products.push(newProduct);
  await writeFile(products);
  return newProduct;
};

export const removeProduct = async (id) => {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return null;
  }

  const [removedProduct] = products.splice(index, 1);
  await writeFile(products);

  return removedProduct;
};

// addProduct({ title: "Mango", price: 7 });

removeProduct("h61JPurltCkBfqT3Cc17b");

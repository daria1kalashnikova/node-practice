import { Op } from "sequelize";
import Product from "../db/models/product.js";

export const createProduct = async (product) => {
  return Product.create(product);
};

export const getProducts = async ({
  page,
  limit,
  search,
  priceMin,
  priceMax,
  // nameSort,
  // priceSort,
  // discountSort,
  ...sortRest
}) => {
  const offset = (page - 1) * limit;
  const sort = Object.entries(sortRest)
    .filter(([key, value]) => {
      return value;
    })
    .map(([key, value]) => {
      return [key.split("Sort")[0], value.toUpperCase()];
    });
  const products = Product.findAll({
    offset,
    limit: Number(limit),
    where: {
      ...(search && {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      }),
      ...((priceMin || priceMax) && {
        price: {
          [Op.and]: [
            ...(priceMin ? [{ [Op.gte]: priceMin }] : []),
            ...(priceMax ? [{ [Op.lte]: priceMax }] : []),
          ],
        },
      }),
    },
    ...(sort.length !== 0 && {
      order: sort,
    }),
  });
  return products;
};

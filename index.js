import { program } from "commander";

// import { getProducts, addProduct, removeProduct } from "./products.js";

import * as actions from "./products.js";

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "getAll":
      const allProducts = await actions.getProducts();
      return console.table(allProducts);
    case "add":
      const newProduct = await actions.addProduct(data);
      return console.log(newProduct);
    case "remove":
      const removedProduct = await actions.removeProduct(id);
      return console.log(removedProduct);
    default:
      console.error("Unknown action");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-t, --title <type>")
  .option("-p, --price <type>");

program.parse();

const options = program.opts();
// console.log(process.argv);
console.log(options);
invokeAction(options);

import express from "express";
import * as controllers from "../../controllers/product.controllers.js";
import { upload } from "../../helpers/upload.js";

const productsRouter = express.Router();

productsRouter.post("/", controllers.createProduct);

productsRouter.get("/", controllers.getProducts);

productsRouter.patch(
  "/:id",
  upload.single("product"),
  controllers.updateProduct
);

export default productsRouter;

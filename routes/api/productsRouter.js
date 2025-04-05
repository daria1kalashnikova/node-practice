import express from "express";
import * as controllers from "../../controllers/product.controllers.js";

const productsRouter = express.Router();

productsRouter.post("/", controllers.createProduct);

export default productsRouter;

import { Router } from "express";
import {
  getProductsController,
  createProductController,
} from "../../controllers/productsController";

const productsRouter: Router = Router();

productsRouter.get("/", getProductsController);
productsRouter.post("/", createProductController);

export default productsRouter;

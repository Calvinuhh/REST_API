import { Router } from "express";
import {
  createOrderController,
  getOrdersController,
} from "../../controllers/ordersController";
import { newOrderValidations } from "../../middlewares/newOrderMiddleware";

const orderRouter: Router = Router();

orderRouter.post("/", newOrderValidations, createOrderController);
orderRouter.get("/", getOrdersController);

export default orderRouter;

import { Router } from "express";
import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  deleteOrderByIdController,
} from "../../controllers/ordersController";
import { newOrderValidations } from "../../middlewares/newOrderMiddleware";
import { validateObjectIdMiddleware } from "../../middlewares/objectIdValidation";

const orderRouter: Router = Router();

orderRouter.post("/", newOrderValidations, createOrderController);
orderRouter.get("/", getOrdersController);
orderRouter.get("/:id", validateObjectIdMiddleware, getOrderByIdController);
orderRouter.delete(
  "/:id",
  validateObjectIdMiddleware,
  deleteOrderByIdController
);

export default orderRouter;

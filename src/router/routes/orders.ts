import { Router } from "express";
import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  deleteOrderByIdController,
} from "../../controllers/ordersController";
import { newOrderValidations } from "../../middlewares/newOrderMiddleware";
import { validateObjectIdMiddleware } from "../../middlewares/objectIdValidation";
import { authorization } from "../../middlewares/authorization";

const orderRouter: Router = Router();

orderRouter.use(authorization);
orderRouter.param("id", validateObjectIdMiddleware);

orderRouter.post("/", newOrderValidations, createOrderController);
orderRouter.get("/", getOrdersController);
orderRouter.get("/:id", getOrderByIdController);
orderRouter.delete("/:id", deleteOrderByIdController);

export default orderRouter;

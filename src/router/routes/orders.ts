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

orderRouter.post(
  "/",
  authorization,
  newOrderValidations,
  createOrderController
);

orderRouter.get("/", authorization, getOrdersController);

orderRouter.get(
  "/:id",
  authorization,
  validateObjectIdMiddleware,
  getOrderByIdController
);

orderRouter.delete(
  "/:id",
  authorization,
  validateObjectIdMiddleware,
  deleteOrderByIdController
);

export default orderRouter;

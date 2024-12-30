import { Router } from "express";
import {
  createClientController,
  deleteClientByIdController,
  getClientByIdController,
  getClientsController,
  updateClientController,
} from "../../controllers/clientsController";
import { newClientValidations } from "../../middlewares/newClientMiddleware";
import { validateObjectIdMiddleware } from "../../middlewares/objectIdValidation";
import { patchClientValidations } from "../../middlewares/updateMiddlewares";

const clientsRouter: Router = Router();

clientsRouter.post("/", newClientValidations, createClientController);
clientsRouter.get("/", getClientsController);
clientsRouter.get("/:id", validateObjectIdMiddleware, getClientByIdController);
clientsRouter.patch("/:id", patchClientValidations, updateClientController);
clientsRouter.delete(
  "/:id",
  validateObjectIdMiddleware,
  deleteClientByIdController
);

export default clientsRouter;

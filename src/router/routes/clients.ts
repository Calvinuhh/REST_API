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
import { authorization } from "../../middlewares/authorization";

const clientsRouter: Router = Router();

clientsRouter.use(authorization);
clientsRouter.param("id", validateObjectIdMiddleware);

clientsRouter.post("/", newClientValidations, createClientController);
clientsRouter.get("/", getClientsController);
clientsRouter.get("/:id", getClientByIdController);
clientsRouter.patch("/:id", patchClientValidations, updateClientController);
clientsRouter.delete("/:id", deleteClientByIdController);

export default clientsRouter;

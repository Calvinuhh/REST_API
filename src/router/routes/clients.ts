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

clientsRouter.post(
  "/",
  authorization,
  newClientValidations,
  createClientController
);
clientsRouter.get("/", authorization, getClientsController);

clientsRouter.get(
  "/:id",
  authorization,
  validateObjectIdMiddleware,
  getClientByIdController
);
clientsRouter.patch(
  "/:id",
  authorization,
  patchClientValidations,
  updateClientController
);
clientsRouter.delete(
  "/:id",
  authorization,
  validateObjectIdMiddleware,
  deleteClientByIdController
);

export default clientsRouter;

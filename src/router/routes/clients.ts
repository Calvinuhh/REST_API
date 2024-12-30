import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  getClientsController,
} from "../../controllers/clientsController";
import { newClientValidations } from "../../middlewares/newClientValidation";

const clientsRouter: Router = Router();

clientsRouter.post("/", newClientValidations, createClientController);
clientsRouter.get("/", getClientsController);
clientsRouter.get("/:id");
clientsRouter.put("/:id");
clientsRouter.patch("/:id");
clientsRouter.delete("/:id", deleteClientController);

export default clientsRouter;

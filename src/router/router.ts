import { Router } from "express";
import clientsRouter from "./routes/clients";

const router: Router = Router();

router.use("/clients", clientsRouter);

export default router;

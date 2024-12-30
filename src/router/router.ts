import { Router } from "express";
import clientsRouter from "./routes/clients";
import productsRouter from "./routes/products";

const router: Router = Router();

router.use("/clients", clientsRouter);
router.use("/products", productsRouter);

export default router;

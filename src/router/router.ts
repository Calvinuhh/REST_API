import { Router } from "express";
import clientsRouter from "./routes/clients";
import productsRouter from "./routes/products";
import orderRouter from "./routes/orders";

const router: Router = Router();

router.use("/clients", clientsRouter);
router.use("/products", productsRouter);
router.use("/orders", orderRouter);

export default router;

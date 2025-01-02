import { Router } from "express";
import clientsRouter from "./routes/clients";
import productsRouter from "./routes/products";
import orderRouter from "./routes/orders";
import usersRouter from "./routes/users";

const router: Router = Router();

router.use("/", usersRouter);
router.use("/clients", clientsRouter);
router.use("/products", productsRouter);
router.use("/orders", orderRouter);

export default router;

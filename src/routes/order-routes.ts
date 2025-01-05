import Router from "express";
import { OrderController } from "../controllers/order-controller";

const router = Router();
const orderController = new OrderController();

// Obtener todos los pedidos
router.get("/orders", orderController.getAllOrders.bind(orderController));

export default router;

import Router from "express";
import { OrderController } from "../controllers/order-controller";

const router = Router();
const orderController = new OrderController();

// Obtener todos los pedidos
router.get("/orders", orderController.getAllOrders.bind(orderController));

router.get("/orders/:id", orderController.getOrderById.bind(orderController));

// Crear una nueva orden
router.post("/orders", orderController.createOrder.bind(orderController));

export default router;

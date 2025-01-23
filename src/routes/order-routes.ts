import Router from "express";
import { OrderController } from "../controllers/order-controller";

const router = Router();
const orderController = new OrderController();

//Obtener todos los pedidos
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - _id
 *         - products
 *         - quantity
 *         - totalPrice
 *         - status
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: number
 *                 description: Cantidad del producto
 *         totalPrice:
 *           type: number
 *           description: Total del pedido
 *         status:
 *           type: string
 *           description: Estado del pedido
 *       example:
 *         _id: "67896e9088c0e71a918eda79"
 *         products:
 *           - product:
 *               _id: "67896e9088c0e71a918eda70"
 *               name: "Nigiri de salmón"
 *               description: "Delicado arroz sushi cubierto con una fina lámina de salmón fresco."
 *               price: 450
 *               category: "Nigiri"
 *               available: true
 *               __v: 0
 *             quantity: 2
 *             _id: "67896e9088c0e71a918eda7a"
 *           - product:
 *               _id: "67896e9088c0e71a918eda71"
 *               name: "Roll California"
 *               description: "Roll con arroz, alga nori, palta, queso crema y kanikama."
 *               price: 700
 *               category: "Rolls"
 *               available: true
 *               __v: 0
 *             quantity: 1
 *             _id: "67896e9088c0e71a918eda7b"
 *         totalPrice: 1600
 *         status: "pending"
 *         __v: 0
 *         createdAt: "2025-01-16T20:39:44.391Z"
 *         updatedAt: "2025-01-16T20:39:44.391Z"
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Operaciones relacionadas con las ordenes
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todas las ordenes
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Lista de ordenes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/orders", orderController.getAllOrders.bind(orderController));
//obtener pedido por id

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get("/orders/:id", orderController.getOrderById.bind(orderController));

// Crear una nueva orden
router.post("/orders", orderController.createOrder.bind(orderController));

export default router;

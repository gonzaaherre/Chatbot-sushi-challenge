import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order-service";
import { CreateOrderDTO } from "../DTOs/order/createOrderDto";

export class OrderController {
  private readonly orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async getAllOrders(_req: Request, res: Response) {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los pedidos" });
    }
  }
  // Obtener una orden por ID
  async getOrderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  // Crear una nueva orden
  async createOrder(req: Request, res: Response) {
    const orderData: CreateOrderDTO = req.body;
    try {
      const newOrder = await this.orderService.createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: "error al crear la orden" });
    }
  }
}

import { Request, Response } from "express";
import { OrderService } from "../services/order-service";

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
}

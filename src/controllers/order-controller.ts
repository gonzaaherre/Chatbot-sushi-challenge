import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order-service";
import { CreateOrderDTO } from "../DTOs/order/createOrderDto";
import mongoose from "mongoose";

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
  async getOrderById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      // Validar ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      // Obtener orden por ID
      const order = await this.orderService.getOrderById(id);

      // Si no se encuentra la orden
      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }

      // Responder con la orden
      res.status(200).json(order);
    } catch (error) {
      // Manejar errores y pasarlos al middleware de manejo de errores
      console.error('Error obteniendo orden por ID:', error);
      next(error);  // Esto pasará el error al middleware de manejo de errores
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

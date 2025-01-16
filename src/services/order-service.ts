import { CreateOrderDTO } from "../DTOs/order/createOrderDto";
import Order from "../models/order-model";
import Product from "../models/product-model";

export class OrderService {
  async getAllOrders() {
    try {
      console.log("obteniendo todos los pedidos");
      const orders = await Order.find().populate("products.product");
      console.log(orders);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOrderById(id: string) {
    try {
      console.log('Obteniendo pedido por ID:', id);

      //buscar la orden en la base de datos
      const order = await Order.findById(id).populate('products.product');

      if (!order) {
        return null;  //si no se encuentra la orden, devolver null
      }

      console.log('Orden encontrada:', order);
      return order;
    } catch (error) {
      console.error('Error en getOrderById:', error);
      throw new Error('Error al obtener la orden');
    }
  }

  // Crear una nueva orden
  async createOrder(orderData: CreateOrderDTO) {
    console.log("creando orden", orderData);
    const productIds = orderData.products.map((item) => item.product);

    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      throw new Error("Uno o más productos no existen");
    }

    let totalPrice = 0;

    orderData.products.forEach((orderItem) => {
      const product = products.find(
        (p) => p.id === orderItem.product.toString()
      );
      if (product) {
        totalPrice += product.price * orderItem.quantity;
      }
    });

    const newOrder = new Order({
      ...orderData,
      totalPrice,
    });

    return await newOrder.save();
  }
}

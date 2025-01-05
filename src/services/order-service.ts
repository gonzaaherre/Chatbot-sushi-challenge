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
}

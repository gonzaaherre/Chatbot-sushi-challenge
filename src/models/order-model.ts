import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
  products: Array<{
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }>;
  totalPrice: number;
  createdAt: Date;
}

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<Order>("Order", orderSchema);

export default Order;

import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
  products: Array<{
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }>;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema(
  {
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
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true } // createdAt y updatedAt automáticos
);

const Order = mongoose.model<Order>("Order", orderSchema);

export default Order;

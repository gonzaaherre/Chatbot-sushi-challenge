// src/models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;

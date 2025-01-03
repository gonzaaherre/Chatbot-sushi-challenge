import mongoose, { Schema, Document } from "mongoose";

export interface FAQ extends Document {
  question: string;
  answer: string;
}

const faqSchema: Schema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const FAQ = mongoose.model<FAQ>("FAQ", faqSchema);

export default FAQ;

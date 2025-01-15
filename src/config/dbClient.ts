import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log("MongoDB conectado.");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};

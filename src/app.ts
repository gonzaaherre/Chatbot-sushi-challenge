import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/dbClient";
import faqRoutes from "./routes/FAQ-routes";
import productRoutes from "./routes/product-route";

dotenv.config();

const app = express();
//levantamos el servidor
try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
}

//conectar a la base de datos
connectDB();

//middleware para parsear el cuerpo de las peticiones
app.use(express.json());
app.use("/api", faqRoutes);
app.use("/api", productRoutes);

export default app;

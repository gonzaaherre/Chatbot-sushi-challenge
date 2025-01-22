import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbClient";
import routes from "./routes/index";
import cors = require("cors");
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";


dotenv.config();

const app = express();
//levantamos el servidor
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
    allowedHeaders: process.env.CORS_HEADERS
  })
);

try {
  if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//conectar a la base de datos
connectDB();

//middleware para parsear el cuerpo de las peticiones
app.use(express.json());

//rutas
app.use("/api", routes);

export default app;

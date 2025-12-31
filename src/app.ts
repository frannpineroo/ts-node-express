import express from "express";
import itemRoutes from "./routes/itemRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// Rutas
app.use("/items", itemRoutes);

// Manejador de errores
app.use(errorHandler);

export default app;
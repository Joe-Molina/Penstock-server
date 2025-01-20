import express from "express";
import cors from "cors";
import auth from "./api/auth/auth.routes";
import products from "./api/products/products.routes";
import cookieParser from "cookie-parser";
import Orders from "./api/orders/orders.routes";
import path from 'path';
import { authMiddleware } from "./services/authMiddleware";

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['https://penstock.jodomodev.com', 'http://localhost:3001'], // Dominio del cliente
  credentials: true, // Permitir el envío de cookies
}));
app.use(cookieParser());

app.use("/auth", authMiddleware, auth);
app.use("/products", authMiddleware, products);
app.use("/orders", Orders);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

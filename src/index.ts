import express from "express";
import cors from "cors";
import auth from "./api/auth/auth.routes";
import products from "./api/products/products.routes";
import cookieParser from "cookie-parser";
import Orders from "./api/orders/orders.routes";
import path from 'path';
// import { CorsOptions } from "cors";

// const allowedOrigins: string[] = [
//   "http://localhost:3001",
//   "https://pedidos-client.vercel.app",
//   "https://pedidos-client-dni37cv5t-joemolinas-projects.vercel.app"
// ];

// const corsOptions: CorsOptions = {
//   origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Permitir acceso
//     } else {
//       callback(new Error("No autorizado por CORS")); // Rechazar acceso
//       console.log('diablo pero q paso')
//     }
//   },
//   credentials: true, // Permitir el envío de cookies
// };

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('*', cors({
  origin: ["http://localhost:3001", "https://pedidos-client.vercel.app"], // Dominio del cliente
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  credentials: true, // Permitir el envío de cookies
}));


app.use("/auth", auth);
app.use("/products", products);
app.use("/orders", Orders);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

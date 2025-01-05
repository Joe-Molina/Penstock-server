import express from "express";
import cors from "cors";
import auth from "./api/auth/auth.routes";
import products from "./api/products/products.routes";
import cookieParser from "cookie-parser";
import Orders from "./api/orders/orders.routes";
import path from 'path';
import session from 'express-session';
import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface Session {
    user?: { username: string, email: string, role: string, lodef: boolean, id: number };
  }
}

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3001", "https://pedidos-client.vercel.app"], // Dominio del cliente
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  credentials: true, // Permitir el envío de cookies
}));

app.use(
  session({
    secret: 'el_mejor_secreto_del_mundo_mundiall', // Cambia esto por una cadena más segura en producción
    resave: false, // Evita que la sesión se guarde si no hay cambios
    saveUninitialized: false, // No guarda sesiones vacías
    cookie: {
      secure: false, // Cambia a true si usas HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 día en milisegundos
    },
  })
);

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'No estás autenticado' });
  }
};

app.use("/auth", auth);
app.use("/products", products);
app.use("/orders", Orders);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

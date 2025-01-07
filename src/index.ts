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
app.use(cors({
  origin: ['https://penstock.jodomodev.com', 'http://localhost:3001'], // Dominio del cliente
  credentials: true, // Permitir el envío de cookies
}));
app.use(cookieParser());

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

app.get('/pruebacookie', (_req, res) => {
  // Supongamos que el usuario se ha autenticado correctamente.
  const token = 'mi-token-jwt'; // Ejemplo de un token que podrías generar

  // Configurar la cookie HttpOnly
  res.cookie('authToken', token, {
    httpOnly: true,           // Hace que la cookie no sea accesible desde JavaScript
    secure: process.env.NODE_ENV === 'production', // En producción, la cookie solo se envía a través de HTTPS
    maxAge: 60 * 60 * 24 * 7, // La cookie expirará en 1 semana
    path: '/',
    domain: 'localhost',
    sameSite: 'none',
    partitioned: true,               // La cookie es válida para todas las rutas

  });

  // Enviar una respuesta al cliente
  res.status(200).json({ message: 'Login exitoso, cookie configurada' });
});

app.get('/gettoken', (req, res) => {
  // Verificar si la cookie 'authToken' está presente
  const token = req.cookies.authToken;

  // Si la cookie está presente, responder con el contenido protegido
  res.status(200).json({ message: 'Contenido protegido', token });
});

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

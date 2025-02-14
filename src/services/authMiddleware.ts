import { NextFunction } from "express";
import { jwtVerify } from "./dataUser";

export const authMiddleware = (req: any, res: any, next: NextFunction) => {

  const token = req.cookies['access_token']
  const user = jwtVerify(token)
  req.user = user;

  try {
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Continuar con la ejecución de la siguiente función en la cadena de middlewares
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
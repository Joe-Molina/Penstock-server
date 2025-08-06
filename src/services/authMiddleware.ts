import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "./dataUser";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies['access_token']


  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const user = jwtVerify(token)

    if (!user) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }

    req.user = user;
    next();
  } catch (err) {

    if (err instanceof Error) {
      console.error(err.message);
    }

    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
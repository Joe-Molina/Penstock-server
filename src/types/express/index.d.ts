// src/types/express/index.d.ts

// import { Request } from 'express';

// Definimos el tipo de la carga útil del usuario que va en el JWT
export interface UserPayload {
  name: string;
  lastname: string;
  username: string;
  email: string;
}

export interface UserPayloadJwt extends UserPayload {
  id: number;
  companyId?: number;
}

// Ahora usamos la declaración de módulos para extender el namespace de Express
declare global {
  namespace Express {
    interface Request {
      user: UserPayloadJwt;
    }
  }
}
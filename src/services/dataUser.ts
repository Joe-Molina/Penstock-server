import jwt from "jsonwebtoken";
import { UserPayloadJwt } from "../types/express";
const JWT_SECRET_KEY = "el_mejor_secreto_del_mundo_mundiall"

export const jwtVerify = (key: string) => {
  if (!key) {
    return false;
  } else {
    const user = jwt.verify(key, JWT_SECRET_KEY) as UserPayloadJwt;
    return user;
  }
};

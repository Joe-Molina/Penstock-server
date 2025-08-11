import jwt from "jsonwebtoken";
import { UserPayloadJwt } from "../types/express";
import 'dotenv/config'

export const jwtVerify = (key: string) => {
  const secret = process.env.JWT_SECRET_KEY
  if (!key) {
    return false;
  } else {
    const user = jwt.verify(key, secret!) as UserPayloadJwt;
    return user;
  }
};

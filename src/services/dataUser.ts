import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";

export const dataUser = (key: string) => {
  if (!key) {
    return false;
  } else {
    const user = jwt.verify(key, JWT_SECRET_KEY) as {
      id: number;
      username: string;
      email: string;
      role: string;
    };
    return user;
  }
};

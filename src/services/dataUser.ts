import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = "el_mejor_secreto_del_mundo_mundiall"

export const jwtVerify = (key: string) => {
  if (!key) {
    return false;
  } else {
    const user = jwt.verify(key, JWT_SECRET_KEY) as {
      id: number;
      username: string;
      email: string;
      role: string;
      loged: boolean;
      companyId: number;
      companyName: string;
    };
    return user;
  }
};

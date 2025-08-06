import { AuthModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = "el_mejor_secreto_del_mundo_mundiall"
import { jwtVerify } from "../../services/dataUser";
import { Request, Response } from "express";


export class Auth {

  static info = {

    userInfo: async (req: Request, res: Response) => {

      const token = req.cookies['access_token'];

      try {
        if (token != undefined) {
          const response = jwtVerify(token);

          console.log(response)

          if (response && response.loged) {
            return res.json({ user: true, username: response.username, email: response.email });
          }

          res.json({ user: false });
        } else {
          res.json({ user: false });
        }
      } catch (error) {
        console.error(error);
        res.json({ user: false }).status(500);
      }
    },


  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body.credentials;

    console.log('llegue')

    try {
      const user = await AuthModel.findUserByUsername(username);

      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            loged: true,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "8h",
          }
        );

        const matchPassword = bcrypt.compareSync(password, user.password);
        if (matchPassword) {
          res
            .cookie("access_token", token, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: 1000 * 60 * 60, // 1 hour
            })
            .json({ message: "cookie set", loged: true, token });

        } else {
          res.json({ message: "incorrect password", loged: false });
        }
      } else {
        console.log("user not found");
        res.json({ message: "user not found", loged: false });
      }
    } catch (error) {
      res.json(error);
    }
  }

  async logout(req: Request, res: Response) {

    res.clearCookie('access_token').json({ message: 'Sesión cerrada exitosamente' });
    ;
  }

  static async registerUser(req: Request, res: Response) {
    const { username, email, password, name, lastname } = req.body

    try {
      const userExist = await AuthModel.findUserByUsername(username);

      if (userExist) {
        res.json({ alert: "this user already exist" });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUserData = {
          username,
          password: hashedPassword,
          name,
          lastname,
          email,
        };

        const newUser = await AuthModel.createUser(newUserData);

        res.json(newUser);
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async registerCompany(req: Request, res: Response) {
    const { id } = req.user
    const { name } = req.body

    try {
      const companyExist = await AuthModel.findCompanyByName(name);
      const moreThanOneCompany = await AuthModel.findCompanyByUser(id)

      if (companyExist || moreThanOneCompany) {
        res.json({ alert: "this user already exist" });
      } else {

        const newUser = await AuthModel.createCompany({ userId: id, name });

        res.json(newUser);
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

}

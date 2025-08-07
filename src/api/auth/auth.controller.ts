import { AuthModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { jwtSecret } from "../../../config";


export class Auth {

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await AuthModel.findUserByUsername(username);

      console.log(user)

      if (user && jwtSecret) {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            logged: true,
            companyId: user.Company[0] ? user.Company[0].id : undefined
          },
          jwtSecret,
          {
            expiresIn: "8h",
          }
        );

        console.log(token)

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
      if (error instanceof Error) {
        console.log(error)
        res.json(error.message);
      }
    }
  }

  static async logout(_req: Request, res: Response) {

    res.clearCookie('access_token').json({ message: 'Sesión cerrada exitosamente' });
    ;
  }

  static async registerUser(req: Request, res: Response) {
    const { username, email, password, name, lastname } = req.body

    try {
      const userExist = await AuthModel.findUserByUsername(username);
      console.log({ username, email, password, name, lastname })


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

  static async isLoged(req: Request, res: Response) {
    const { user } = req

    try {
      if (user.id) {
        res.json({ loged: true })
      }
    } catch (error) {
      if (error instanceof Error) res.json({ loged: false })
    }
  }

}

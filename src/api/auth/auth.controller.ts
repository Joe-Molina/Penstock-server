import { AuthModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../../config";
import { dataUser } from "../../services/dataUser";

export class Auth {
  static async registerClient(req: any, res: any) {
    const {
      username,
      email,
      password,
      name,
      lastname,
      store,
      address,
      role,
      sellerId,
    } = req.body;

    try {
      const userExist = await AuthModel.findUserByUsername(username);

      if (userExist) {
        res.json({ alert: "this user already exist" });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const client = {
          username,
          password: hashedPassword,
          email,
          name,
          lastname,
          store,
          address,
          role,
          sellerId,
        };

        const newClient = await AuthModel.createClient(client);

        res.json(newClient);
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async registerSeller(req: any, res: any) {
    const { username, email, password, name, lastname } = req.body.credentials;

    console.log(req.body)

    try {
      const userExist = await AuthModel.findUserByUsername(username);

      console.log(userExist)

      if (userExist) {
        console.log('hola')
        res.json({ alert: "this user already exist" });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);

        console.log('hola2')

        const client = {
          username,
          password: hashedPassword,
          email,
          name,
          role: "seller",
          lastname,
        };

        const newSeller = await AuthModel.createSeller(client);

        res.json(newSeller);
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async registerAdmin(req: any, res: any) {
    const { username, email, password, role } = req.body;

    try {
      const userExist = await AuthModel.findUserByUsername(username);

      if (userExist) {
        res.json({ alert: "this user already exist" });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const admin = {
          username,
          password: hashedPassword,
          email,
          role,
        };

        const newSeller = await AuthModel.createAdmin(admin);

        res.json(newSeller);
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async login(req: any, res: any) {
    const { username, password } = req.body.credentials;

    try {
      const user = await AuthModel.findUserByUsername(username);

      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            loged: true,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        const matchPassword = bcrypt.compareSync(password, user.password);
        if (matchPassword) {
          res
            .cookie("access_token", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60, // 1 hour
            })
            .json({ message: "cookie set", loged: true });
        } else {
          res.json({ message: "incorrect password", loged: false });
        }
      } else {
        console.log(" no hay user");
        res.json({ message: "user not found", loged: false });
      }
    } catch (error) {
      res.json(error);
    }
  }

  static async logout(_req: any, res: any) {
    res.clearCookie("access_token");
    res.send("coockie is cleared correctly");
  }

  static async protected(req: any, res: any) {
    try {
      const response = dataUser(req.body.key);

      if (response) {
        res.json(response);
      } else {
        res.json({ response: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getSellers(req: any, res: any) {
    try {
      const sellers = await AuthModel.getAllSellers();

      if (sellers) {
        res.json(sellers);
      } else {
        res.json({ response: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deleteSeller(req: any, res: any) {
    try {
      const sellers = await AuthModel.deleteSeller(Number(req.params.id));

      if (sellers) {
        res.json(sellers);
      } else {
        res.json({ response: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async protected2(req: any, res: any) {
    try {
      console.log(req.cookies.access_token)

      const data = dataUser(req.cookies.access_token);
      // const data = dataUser(req.cookies.access_token);
      console.log(data)

      if (data) {
        res.json(data);
      } else {
        res.json({ response: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async assignSeller(req: any, res: any) {
    const { sellerId, clientId } = req.body;

    try {
      const asignment = await AuthModel.assignSeller(clientId, sellerId);
      res.json(asignment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

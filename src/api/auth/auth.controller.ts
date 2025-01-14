import { AuthModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = "el_mejor_secreto_del_mundo_mundiall"
import { jwtVerify } from "../../services/dataUser";
import { PAHTS_API } from "../../services/pahts";

export class Auth {


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

  static async logout(req: any, res: any) {
    res.clearCookie('access_token').json({ message: 'Sesión cerrada exitosamente' });
    ;
  }

  static async userInfo(req: any, res: any) {

    const token = req.cookies['access_token'];

    console.log(token)

    try {
      if (token != undefined) {
        const response = jwtVerify(token);

        if (response && response.loged) {
          return res.json({ user: true, username: response.username, role: response.role, email: response.email });
        }

        res.json({ user: false });
      } else {
        res.json({ user: false });
      }
    } catch (error) {
      console.error(error);
      res.json({ user: false }).status(500);
    }
  }

  static async NavInfo(req: any, res: any) {

    const token = req.cookies['access_token'];

    console.log(token)

    try {
      if (token != undefined) {
        const response = jwtVerify(token);

        if (response && response.role === 'client') {
          return res.json(PAHTS_API.navClient);
        }

        if (response && response.role === 'seller') {
          return res.json(PAHTS_API.navSeller);
        }

        if (response && response.role === 'admin') {
          return res.json(PAHTS_API.navAdmin);
        }

        res.json({ user: false });
      } else {
        res.json({ user: false });
      }
    } catch (error) {
      console.error(error);
      res.json({ user: false }).status(500);
    }
  }

  static async registerClient(req: any, res: any) {

    console.log(req.body);

    const {
      name,
      lastname,
      username,
      email,
      password,
      sellerId,
      store,
      address,
    } = req.body.credentials;

    try {
      // Verifica si el usuario ya existe
      const userExist = await AuthModel.findUserByUsername(username);

      console.log(userExist)

      if (userExist) {
        return res.status(400).json({ alert: "This user already exists", userExist });
      }

      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea un objeto cliente
      const client = {
        username,
        password: hashedPassword,
        email,
        name,
        lastname,
        store,
        address,
        role: "client",
        sellerId: Number(sellerId),
      };

      console.log(client)

      // Intenta registrar al cliente
      const newClient = await AuthModel.createClient(client);

      if (!newClient) {
        return res.status(500).json({ error: "Error registering client" });
      }

      // Responde con el cliente registrado
      return res.status(201).json(newClient);
    } catch (err: any) {
      console.error("Error during client registration:", err);
      return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }

  static async registerSeller(req: any, res: any) {
    const { username, email, password, name, lastname } = req.body.credentials;

    try {
      const userExist = await AuthModel.findUserByUsername(username);

      console.log(userExist)

      if (userExist) {
        return res.status(400).json({ alert: "This user already exists" });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      const client = {
        username,
        password: hashedPassword,
        email,
        name,
        role: "seller",
        lastname,
      };

      const newSeller = await AuthModel.createSeller(client);

      if (!newSeller) {
        return res.status(500).json({ error: "Error registering client" });
      }

      res.json(newSeller);

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

  static async getClients(req: any, res: any) {
    try {
      const clients = await AuthModel.getAllClients();

      if (clients) {
        res.json(clients);
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
        console.log(sellers)
        res.json(sellers);
      }

      // res.status(404).json({ error: 'a problem has ocurred' })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async restoreSeller(req: any, res: any) {
    try {
      const sellers = await AuthModel.RestoreSeller(Number(req.params.id));

      if (sellers) {
        res.json(sellers);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deleteClient(req: any, res: any) {
    try {
      const client = await AuthModel.deleteClient(Number(req.params.id));

      if (client) {
        res.json(client);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async restoreClient(req: any, res: any) {
    try {
      const client = await AuthModel.RestoreClient(Number(req.params.id));

      if (client) {
        res.json(client);
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

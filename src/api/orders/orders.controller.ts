import { dataUser } from "../../services/dataUser";
import { OrdersModel } from "./orders.model";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export class Orders {
  static async getAllOrders(_req: any, res: any) {
    try {
      const orders = await OrdersModel.getOrders();
      res.json(orders);
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async getAllClientOrdersBySeller(req: any, res: any) {
    const data: User | false = dataUser(req.cookies.access_token);

    if (data != false) {
      if (data.role == "admin") {
        const { sellerId } = req.params;

        const clientsIds = await OrdersModel.getAssignedCustomersIds(sellerId);

        const clientsOrders = await OrdersModel.getOrders_fromAssignedCustomers(
          clientsIds
        );

        res.json(clientsOrders);
      } else if (data.role == "seller") {
        const clientsIds = await OrdersModel.getAssignedCustomersIds(data.id);

        const clientsOrders = await OrdersModel.getOrders_fromAssignedCustomers(
          clientsIds
        );

        res.json(clientsOrders);
      }
    } else {
      res.status(401).json({ error: "no autenticado" });
    }
  }

  static async getClientOrdersByClient(req: any, res: any) {
    const data: User | false = dataUser(req.cookies.access_token);
    try {
      if (data != false) {
        const orders = await OrdersModel.getOrdersByClientId(data.id);

        res.json(orders);
      } else {
        res.status(401).json({ error: "no autenticado" });
      }

      const orders = await OrdersModel.getOrdersByClientId(req.params.id);
      res.json(orders);
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async ClientcreateOrder(req: any, res: any) {
    const data: User | false = dataUser(req.cookies.access_token);
    try {
      if (data != false) {
        const order = await OrdersModel.createOrder(data.id, req.body.details);

        res.json(order);
      } else {
        res.status(401).json({ error: "no autenticado" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async AdmincreateOrder(req: any, res: any) {
    const { clientId, data } = req.body;

    try {
      const order = await OrdersModel.createOrder(clientId, data);
      res.json(order);
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async createInvoice(req: any, res: any) {
    try {
      const invoice = await OrdersModel.createInvocie(
        req.body.invoice_number,
        req.body.orderId
      );
      res.json(invoice);
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async getAllInvoices(req: any, res: any) {
    try {
      const invoices = await OrdersModel.getAllInvocies();
      res.json(invoices);
    } catch (err) {
      res.json({ error: err });
    }
  }
}

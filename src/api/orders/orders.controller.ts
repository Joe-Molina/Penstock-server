import { jwtVerify } from "../../services/dataUser";
import { OrdersModel } from "./orders.model";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export class Orders {
  static async getAllOrders(req: any, res: any) {

    const { companyId } = req.user

    try {
      if (companyId) {
        const orders = await OrdersModel.getOrders(companyId);

        console.log(orders, 'aaaa')
        res.json(orders);
      } else {
        res.json(false)
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async getAllClientOrdersBySeller(req: any, res: any) {
    const data: User | false = jwtVerify(req.cookies.access_token);

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
    const data: User | false = jwtVerify(req.cookies.access_token);
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

  static async createOrder(req: any, res: any) {
    const user = jwtVerify(req.cookies.access_token);
    const { details, clientId } = req.body

    console.log('al menos llega', details, clientId)
    console.log(req.body)

    try {
      if (user && user.role == 'client') {
        console.log('client')
        const order = await OrdersModel.createOrder(user.id, details, false, user.companyId);
        res.json(order);

      } else if (user && user.role == 'admin') {
        console.log('admin')
        const order = await OrdersModel.createOrder(clientId, details, true, user.companyId);
        res.json(order);

      } else {
        res.status(401).json({ error: "no autenticado" });
      }
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

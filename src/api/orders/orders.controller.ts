import { Request, Response } from "express";
import { jwtVerify } from "../../services/dataUser";
import { OrdersModel } from "./orders.model";
export class Orders {
  static async getAllOrders(req: Request, res: Response) {

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

  static async createOrder(req: Request, res: Response) {
    const user = jwtVerify(req.cookies.access_token);
    const { details, clientId } = req.body

    try {
      if (user && user.companyId) {
        const order = await OrdersModel.createOrder(clientId, details, true, user.companyId);
        res.json(order);

      } else {
        res.status(401).json({ error: "no autenticado" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  static async createInvoice(req: Request, res: Response) {
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

  static async getAllInvoices(req: Request, res: Response) {
    try {
      const invoices = await OrdersModel.getAllInvocies();
      res.json(invoices);
    } catch (err) {
      res.json({ error: err });
    }
  }
}

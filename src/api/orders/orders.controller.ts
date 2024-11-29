import { OrdersModel } from './orders.model'

export class Orders {

  static async getAllOrders(_req: any, res: any) {
    try {
      const orders = await OrdersModel.getOrders()
      res.json(orders)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getClientOrders(req: any, res: any) {
    try {
      const orders = await OrdersModel.getOrdersByClientId(req.params.id)
      res.json(orders)
    } catch (err) {
      res.json({ error: err })
    }
  }
}
import { prisma } from '../../utils/prisma'

export class OrdersModel {

  static async getOrders() {
    const orders = await prisma.order.findMany()
    return orders
  }

  static async getOrdersByClientId(clientId: number) {
    const orders = await prisma.order.findMany({
      where: {
        clientId
      }
    })
    return orders
  }

  static async getOrderByIdModel({ id }: any) {
    const order: any | null = await prisma.order.findFirst({
      where: {
        id
      }
    })
    return order
  }

  static async createOrder({ clientId, details }: any) {
    const newOrder = await prisma.order.create({
      data: {
        clientId,
        Order_Detail: {
          create: details
        }
      }
    })
    return newOrder
  }

}
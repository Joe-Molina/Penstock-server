import { prisma } from "../../utils/prisma";

export class OrdersModel {
  static async getOrders() {
    const orders = await prisma.order.findMany({
      include: {
        Order_Detail: true,
        client: {
          select: {
            name: true
          },
        },
      },
    });
    return orders;
  }

  static async getOrders_fromAssignedCustomers(ids: any[]) {
    const orders = await prisma.order.findMany({
      where: {
        clientId: {
          in: ids,
        },
      },
      include: {
        Order_Detail: true,
      },
    });
    return orders;
  }

  static async getAssignedCustomersIds(id: any) {
    const clients = await prisma.salesperson_assignment.findMany({
      where: {
        sellerId: id,
      },
      select: {
        clientId: true,
      },
    });

    return clients;
  }

  static async getOrdersByClientId(clientId: number) {
    const orders = await prisma.order.findMany({
      where: {
        clientId,
      },
      include: {
        Order_Detail: true,
      },
    });
    return orders;
  }

  static async getOrderById({ id }: any) {
    const order: any | null = await prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        Order_Detail: true,
      },
    });
    return order;
  }

  static async createOrder(clientId: number, details: any, revised: boolean) {
    try {
      const newOrder = await prisma.order.create({
        data: {
          clientId,
          revised,
          Order_Detail: {
            createMany: {
              data: details,
            },
          },
        },
        include: {
          Order_Detail: true,
        },
      });
      return newOrder;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async createInvocie(invoice_number: number, orderId: number) {
    const newInvoice = await prisma.invoice.create({
      data: {
        invoice_number,
        orderId,
      },
    });

    return newInvoice;
  }

  static async getAllInvocies() {
    const Invoices = await prisma.invoice.findMany();

    return Invoices;
  }
}

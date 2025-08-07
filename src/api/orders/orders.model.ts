import { prisma } from "../../utils/prisma";

interface DetailsProps {
  orderId: number
  productId: number
  cant: number
  actual_price: number
}

export class OrdersModel {
  static async getOrders(companyId: number) {
    const orders = await prisma.order.findMany({
      where: {
        companyId
      },
      include: {
        Order_Detail: {
          include: {
            product: true
          }
        },
        client: {
          select: {
            name: true
          },
        },

      },
    });
    return orders;
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

  static async getOrderById({ id }: { id: number }) {
    const order = await prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        Order_Detail: true,
      },
    });

    return order;
  }

  static async createOrder(clientId: number, details: DetailsProps, revised: boolean, companyId: number) {
    try {
      const newOrder = await prisma.order.create({
        data: {
          clientId,
          revised,
          companyId,
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

import { prisma } from "../../utils/prisma";

interface User {
  username: string;
  password: string;
  email: string;
  role: string;
}

interface Client extends User {
  name: string;
  lastname: string;
  store: string;
  address: string;
  sellerId: number;
}

interface Seller extends User {
  name: string;
  lastname: string;
}

export class AuthModel {
  static async findUserById(id: number) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  static async getAllSellers() {
    const user = await prisma.seller.findMany({
      include: {
        user: true
      }
    });

    return user;
  }

  static async deleteSeller(id: number) {
    const user = await prisma.seller.delete({
      where: {
        id,
      },
    });

    return user;
  }

  static async findUserByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  static async createClient({
    username,
    password,
    email,
    role,
    name,
    lastname,
    store,
    address,
    sellerId,
  }: Client) {
    const newClient = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
        client: {
          create: {
            name,
            lastname,
            store,
            address,
            salesperson_assignment: {
              create: {
                sellerId,
              },
            },
          },
        },
      },
    });
    return {
      username: newClient.username,
      email: newClient.email,
    };
  }

  static async createSeller({
    username,
    password,
    email,
    name,
    role,
    lastname,
  }: Seller) {
    const newClient = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
        Seller: {
          create: {
            name,
            lastname,
          },
        },
      },
    });

    return {
      username: newClient.username,
      email: newClient.email,
    };
  }

  static async createAdmin({ username, password, email, role }: User) {
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
      },
    });

    return {
      username: newUser.username,
      email: newUser.email,
    };
  }

  static async assignSeller(clientId: number, sellerId: number) {
    const asignment = await prisma.salesperson_assignment.create({
      data: {
        clientId,
        sellerId,
      },
    });
    return asignment;
  }
}

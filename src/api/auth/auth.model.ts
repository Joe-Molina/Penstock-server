import { prisma } from "../../utils/prisma";

interface User {
  username: string;
  password: string;
  email: string;
  role: string;
  companyId: number;
}

interface Client extends User {
  name: string;
  lastname: string;
  store: string;
  address: string;
  sellerId: number;
  companyId: number;
}

// interface Seller {
//   id: number;
//   user: User;
//   name: string;
//   lastname: string;
//   isAvtive: boolean;
// }

export class AuthModel {

  static async findCompanyByName(name: string) {
    try {
      const company = await prisma.company.findFirst({
        where: {
          name
        },
      });

      return company;
    } catch (error) {
      return console.log('hubo un error al crear la compania')
    }
  }

  static async findUserById(id: number) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  static async getAllSellers(companyId: number) {
    const sellersDb = await prisma.seller.findMany({
      where: {
        user: {
          companyId
        }
      },
      include: {
        user: true
      }
    });

    const Sellers = sellersDb.map((seller) => {
      return {
        id: seller.id,
        name: seller.name,
        lastname: seller.lastname,
        isActive: seller.user.status
      }
    })


    return { Sellers };
  }

  static async getAllClients(companyId: number) {
    const ClientsDb = await prisma.client.findMany({
      where: {
        user: {
          companyId
        }
      },
      include: {
        user: true,
        salesperson_assignment: {
          include: {
            seller: true
          }
        }
      }
    });


    const Clients = ClientsDb.map((client: any) => {
      return {
        address: client.address,
        id: client.id,
        name: client.name,
        lastname: client.lastname,
        store: client.store,
        isActive: client.user.status,
        seller: {
          id: client.salesperson_assignment[0].sellerId,
          name: client.salesperson_assignment[0].seller.name,
          lastname: client.salesperson_assignment[0].seller.lastname
        }
      }
    })

    return { Clients };
  }

  static async deleteSeller(id: number) {

    const seller = await prisma.seller.findFirst({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });

    if (!seller) return console.log('no seller');

    const user = await prisma.user.update({
      where: {
        id: seller.userId,
      },
      data: {
        status: false
      },
    });



    return user;
  }

  static async RestoreSeller(id: number) {

    const seller = await prisma.seller.findFirst({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });

    if (!seller) return;

    const user = await prisma.user.update({
      where: {
        id: seller.userId,
      },
      data: {
        status: true
      },
    });



    return user;
  }

  static async deleteClient(id: number) {

    const seller = await prisma.client.findFirst({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });

    if (!seller) return;

    const user = await prisma.user.update({
      where: {
        id: seller.userId,
      },
      data: {
        status: false
      },
    });



    return user;
  }

  static async RestoreClient(id: number) {

    const seller = await prisma.client.findFirst({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });

    if (!seller) return;

    const user = await prisma.user.update({
      where: {
        id: seller.userId,
      },
      data: {
        status: true
      },
    });



    return user;
  }

  static async findUserByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        Company: true,
      }
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
    companyId
  }: Client) {

    const client = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
        companyId,
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
      include: {
        Seller: true,
        client: {
          include: {
            salesperson_assignment: {
              include: {
                seller: true
              }
            }
          }
        }

      }
    });

    console.log(client)

    return {
      address: client.client[0].address,
      id: client.id,
      name: client.client[0].name,
      lastname: client.client[0].lastname,
      store: client.client[0].store,
      isActive: client.status,
      seller: {
        id: client.client[0].salesperson_assignment[0].sellerId,
        name: client.client[0].salesperson_assignment[0].seller.name,
        lastname: client.client[0].salesperson_assignment[0].seller.lastname
      }
    }
  }

  static async createSeller({
    username,
    password,
    email,
    name,
    role,
    lastname,
    companyId
  }: {
    username: string,
    password: string,
    email: string,
    name: string,
    role: string,
    lastname: string,
    companyId: number
  }) {

    const newSeller = await prisma.user.create({
      include: {
        Seller: true
      },
      data: {
        username,
        password,
        email,
        role,
        companyId,
        Seller: {
          create: {
            name,
            lastname,
          },
        },
      },
    });

    if (newSeller) {
      return {
        id: newSeller.Seller[0].id,
        name: newSeller.Seller[0].name,
        lastname: newSeller.Seller[0].lastname,
        isActive: newSeller.status
      };
    } else {
      return false
    }

  }

  static async createAdmin({ username, password, email, role, company }: { username: string, password: string, email: string, role: string, company: string }) {

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
        Company: {
          create: { name: company }
        }
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

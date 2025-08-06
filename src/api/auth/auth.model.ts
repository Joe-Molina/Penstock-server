import { prisma } from "../../utils/prisma";
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
      if (error instanceof Error) {
        console.error(error)
      }
      return console.log('hubo un error al crear la compania')
    }
  }

  static async findCompanyByUser(id: number) {
    try {
      const company = await prisma.company.findFirst({
        where: {
          userId: id
        },
      });

      return company;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
      }
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

  static async createUser({ username, email, password, lastname, name }: UserPayload & { password: string }) {

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        lastname,
        name,
      },
    });

    return {
      username: newUser.username,
      email: newUser.email,
    };
  }

  static async createCompany({ userId, name }: { userId: number, name: string }) {

    const newCompany = await prisma.company.create({
      data: {
        name,
        userId
      },
    });

    return {
      name: newCompany.name,
    };
  }

}

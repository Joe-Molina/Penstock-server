import { prisma } from '../../utils/prisma'

interface User {
  username: string
  password: string
  email: string
  role: string
}

interface Client extends User {
  name: string
  lastname: string
  store: string
  address: string
}

interface Seller extends User {
  name: string
  lastname: string
}

export class authModel {

  static async findUserById(id: number) {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })

    return user
  }

  static async findUserByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    })

    return user
  }

  static async createClient({ username, password, email, role, name, lastname, store, address }: Client) {
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
            address
          }
        }
      }
    })
    return {
      username: newClient.username,
      email: newClient.email
    }
  }

  static async createSeller({ username, password, email, role, name, lastname }: Seller) {
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
          }
        }
      }
    })

    return {
      username: newClient.username,
      email: newClient.email
    }
  }




}
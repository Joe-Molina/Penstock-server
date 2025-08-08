import { PrismaClient } from '../../generated/prisma'
import { PrismaLibSQL } from "@prisma/adapter-libsql"
import 'dotenv/config'

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL no está definida en las variables de entorno.");
}

const adapter = new PrismaLibSQL({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = new PrismaClient({ adapter });

if (process.env.NODE !== "production") global.prisma = prisma;
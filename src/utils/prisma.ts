import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = new PrismaClient();

if (process.env.NODE !== "production") global.prisma = prisma;

// import { PrismaClient } from "@prisma/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";
// import { createClient } from "@libsql/client";

// const libsql = createClient({
//   url: process.env.TURSO_DATABASE_URL,
//   authToken: process.env.TURSO_AUTH_TOKEN,
// });

// const adapter = new PrismaLibSQL(libsql);
// const prisma = new PrismaClient( {adapter});
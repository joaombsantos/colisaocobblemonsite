import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "65537",
  database: "colisaocobblemon",
});

const prisma = new PrismaClient({ adapter });

export { prisma };
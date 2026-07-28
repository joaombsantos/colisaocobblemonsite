import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = process.env.DATABASE_URL as string;

if (!databaseUrl) {
  throw new Error("A variável DATABASE_URL não foi encontrada no .env!");
}

const dbUrl = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1),
});

const prisma = new PrismaClient({ adapter });

export { prisma };
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();

const global = globalThis as typeof globalThis & {
    prisma: PrismaClient | undefined;
};
 
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
 
export default prisma;
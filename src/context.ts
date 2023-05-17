import { PrismaClient } from '@prisma/client'

export interface IContext {
  prisma: PrismaClient
}

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "production"
      ? ["error"]
      : ["error", "info", "query", "warn"],
})

export const createContext = async () => ({
  prisma: prisma,
})



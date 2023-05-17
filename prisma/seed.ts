import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
const luke = await prisma.phone.create({
        data: {
          number: '1111',
          name: 'Люк Скайуокер',
        },
      })
const vader = await prisma.phone.create({
        data: {
          number: '2222',
          name: 'Дарт Вейдер',
        },
})
  const padme = await prisma.phone.create({
        data: {
          number: '3333',
          name: 'Падме Амидала',
        },
      })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
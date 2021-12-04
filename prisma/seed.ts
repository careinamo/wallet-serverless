import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  await prisma.user.create({
    data: {
      name: "christian",
      email: "christian@gmail.com",
      balance: 20000
    }
  })  

  await prisma.product.create({
    data: {
      name: "helado",
      price: 12000      
    }
  })  
  
  await prisma.product.create({
    data: {
      name: "cafe",
      price: 10000
    }
  })
  

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
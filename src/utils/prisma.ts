import { PrismaClient } from '../../generated/prisma/client'

// Initialize Prisma Client singleton
// Prisma Client will automatically connect when the first query is executed
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

/**
 * Test database connection
 * Used in index.ts to check connection when app starts
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// Graceful shutdown - disconnect when app closes
const gracefulShutdown = async () => {
  await prisma.$disconnect()
  console.log('Prisma Client disconnected')
}

process.on('beforeExit', gracefulShutdown)
process.on('SIGINT', async () => {
  await gracefulShutdown()
  process.exit(0)
})
process.on('SIGTERM', async () => {
  await gracefulShutdown()
  process.exit(0)
})

export default prisma


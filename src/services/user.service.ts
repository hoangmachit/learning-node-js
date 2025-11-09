// Example: Service using Prisma
// Import Prisma from utils when needed
import prisma from '../utils/prisma'

export class UserService {
  // Get all users
  static async getAllUsers() {
    return await prisma.user.findMany()
  }

  // Get user by ID
  static async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      include: { posts: true }, // Include related posts
    })
  }

  // Create new user
  static async createUser(email: string, name?: string) {
    return await prisma.user.create({
      data: {
        email,
        name,
      },
    })
  }
}


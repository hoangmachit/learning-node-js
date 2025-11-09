import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  // GET /api/users - Get all users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers()
      res.status(200).json({
        success: true,
        data: users,
        count: users.length,
      })
    } catch (error) {
      console.error('Error getting users:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to get users',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
      })
    }
  }
}


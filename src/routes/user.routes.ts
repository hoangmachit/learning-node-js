import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const router = Router()

// GET /api/users - Get all users
router.get('/', UserController.getAllUsers)

export default router


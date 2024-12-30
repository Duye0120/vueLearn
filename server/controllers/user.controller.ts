import type { Request, Response } from 'express'

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      // 模拟数据
      const users = [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
      ]
      res.json(users)
    }
    catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params
      res.json({ id: Number(id), name: '张三' })
    }
    catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const userData = req.body
      res.status(201).json({ id: Date.now(), ...userData })
    }
    catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const userData = req.body
      res.json({ id: Number(id), ...userData })
    }
    catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      res.json({ message: `User ${id} deleted` })
    }
    catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

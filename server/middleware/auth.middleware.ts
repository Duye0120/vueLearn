import type { NextFunction, Request, Response } from 'express'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: '未授权访问' })
  }

  // 这里添加你的 token 验证逻辑
  // 例如：验证 JWT token
  try {
    // verify token
    next()
  }
  catch (err) {
    res.status(401).json({ message: '无效的 token' })
  }
}

// 示例：自定义中间件
export function customMiddleware(req: Request, res: Response, next: NextFunction) {
  // 添加自定义字段到请求对象
  req.customData = { timestamp: Date.now() }
  next()
}

// 扩展 Express 的 Request 接口以包含自定义字段
declare global {
  namespace Express {
    interface Request {
      customData?: {
        timestamp: number
      }
    }
  }
}

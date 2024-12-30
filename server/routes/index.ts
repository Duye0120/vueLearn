import type { Express } from 'express'
import productRoutes from './product.routes'
import userRoutes from './user.routes'

export default function setupRoutes(app: Express) {
  // 注册各模块路由
  app.use('/users', userRoutes)
  app.use('/products', productRoutes)

  // 处理 404 错误
  app.use((req, res) => {
    res.status(404).json({ message: `Cannot ${req.method} ${req.url}` })
  })
}

import { Express, Router } from 'express';
import userRoutes from './user.routes';
import productRoutes from './product.routes';

export default function setupRoutes(app: Express) {
  
  // 注册各模块路由
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);

  // 处理 404 错误
  app.use((req, res) => {
    res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
  });

}

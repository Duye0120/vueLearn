import { Express, json, urlencoded } from 'express';
import cors from 'cors';

export const setupMiddleware = (app: Express) => {
  // 处理 CORS
  app.use(cors());

  // 解析 JSON 请求体
  app.use(json());

  // 解析 URL 编码的请求体
  app.use(urlencoded({ extended: true }));

  // 日志中间件
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // 错误处理中间件
  app.use((err: Error, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ 
      message: 'Something broke!',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });
};

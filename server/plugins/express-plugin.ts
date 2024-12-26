// server/plugins/express-plugin.ts
import express, { Express } from 'express';
import type { ViteDevServer } from 'vite';
import { setupMiddleware } from '../config/middleware';
import routes from '../routes';

export default function expressPlugin() {
  const app: Express = express();
  
  setupMiddleware(app);
  routes(app);

  return {
    name: 'vite-plugin-express',
    configureServer(server: ViteDevServer) {
      /**
       * 将 Express 应用程序挂载到 /api 路径以后
       * router 中的路由就可以通过 /api 访问了，就不需要添加配置
       */
      server.middlewares.use('/api',app);

     
      console.log('\n🚀 Express backend is running in Vite...');
      
      // 可以添加路由日志
      app.use((req, res, next) => {
        console.log(`[Express] ${req.method} ${req.url}`);
        next();
      });
    }
  }
}

import { Request, Response } from 'express';

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    try {
      const products = [
        { id: 1, name: '产品1', price: 100 },
        { id: 2, name: '产品2', price: 200 }
      ];
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getProductById(req: Request, res: Response) {
    // 实现获取单个产品的逻辑
    res.json({ id: 1, name: '产品1', price: 100 });
  }

  static async createProduct(req: Request, res: Response) {
    // 实现创建产品的逻辑
    res.status(201).json({ ...req.body, id: Date.now() });
  }

  static async updateProduct(req: Request, res: Response) {
    // 实现更新产品的逻辑
    res.json({ ...req.body, id: req.params.id });
  }

  static async deleteProduct(req: Request, res: Response) {
    // 实现删除产品的逻辑
    res.json({ message: 'Product deleted' });
  }
}

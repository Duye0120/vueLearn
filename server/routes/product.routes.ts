import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'

const router = Router()

// 产品相关路由
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

export default router

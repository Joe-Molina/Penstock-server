import { Router } from 'express'
import { products } from './products.controller'

const router = Router()

router.get('/getProducts', products.getProducts)
router.get('/getProductById/:id', products.getProductById)
router.post('/create', products.createProduct)
router.post('/createCategory', products.createCategory)



export default router
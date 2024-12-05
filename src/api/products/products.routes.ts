import { Router } from 'express'
import { products } from './products.controller'

const router = Router()

router.get('/getProducts', products.getProducts)
router.get('/getProductById/:id', products.getProductById)
router.post('/create', products.createProduct)
router.get('/Categorys', products.getCategorys)
router.post('/Category/create', products.createCategory)
router.delete('/Category/delete/:id', products.deleteCategory)



export default router
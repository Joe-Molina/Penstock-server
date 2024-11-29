import { productModel } from './products.model'

export class products {

  static async getProducts(_req: any, res: any) {
    try {
      const products = await productModel.getProducts()
      res.json(products)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getProductById(req: any, res: any) {
    const { id } = req.params
    try {
      const Oneproduct = await productModel.getProductByIdModel(id)
      res.json(Oneproduct)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async createProduct(req: any, res: any) {
    const { name, price, photo, description, categoryId } = req.body
    try {
      const newProduct = await productModel.createProduct({ name, price, photo, description, categoryId })
      res.json(newProduct)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async createCategory(req: any, res: any) {
    const { name } = req.body
    try {
      const newCategory = await productModel.createCategory(name)
      res.json(newCategory)
    } catch (err) {
      res.json({ error: err })
    }
  }
}
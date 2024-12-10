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

  static async updateProductById(req: any, res: any) {
    const { id } = req.params
    const data = req.body.data
    try {
      const product = await productModel.updateProductByIdModel(id, data)
      res.json(product)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async createProduct(req: any, res: any) {
    const { name, price, photo, description, categoryId } = req.body

    console.log(name, price, photo, description, categoryId)
    try {
      const newProduct = await productModel.createProduct({ name, price, photo, description, categoryId })
      console.log(newProduct)
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

  static async deleteCategory(req: any, res: any) {

    const { id } = req.params

    try {
      // Aquí asumo que `deleteCategory` está esperando un número
      const deletedCategory = await productModel.deleteCategory(id)

      if (!deletedCategory) {
        return res.status(500).json({ error: "Error deleting category" })
      }

      res.json(deletedCategory)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteProduct(req: any, res: any) {

    const { id } = req.params

    const ProductExist = await productModel.getProductByIdModel(id)

    if (!ProductExist) {
      return res.status(404).json({ error: "Product not found" })
    }

    try {
      // Aquí asumo que `deleteCategory` está esperando un número
      const deletedProduct = await productModel.deleteProduct(id)

      if (!deletedProduct) {
        return res.status(500).json({ error: "Error deleting Product" })
      }

      res.json(deletedProduct)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async getCategorys(req: any, res: any) {
    try {
      const Categorys = await productModel.getCategorys()
      // res.json('hola')
      res.json(Categorys)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async saveImage(req: any, res: any) {
    const { filename } = req.file;
    console.log(filename)
    res.json({ filename })
  }

}
import { ProductModel } from './products.model'

export class Products {

  static async getProducts(_req: any, res: any) {
    try {
      const products = await ProductModel.getProducts()
      res.json(products)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getProductsByCategory(req: any, res: any) {
    try {
      const products = await ProductModel.getProductsByCategory(req.params.id)
      res.json(products)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getProductById(req: any, res: any) {
    const { id } = req.params
    try {
      const Oneproduct = await ProductModel.getProductByIdModel(id)
      res.json(Oneproduct)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async updateProductById(req: any, res: any) {
    const { id } = req.params
    const data = req.body.data
    try {
      const product = await ProductModel.updateProductByIdModel(id, data)
      res.json(product)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async createProduct(req: any, res: any) {
    const { name, price, photo, description, categoryId } = req.body.credentials

    console.log(name, price, photo, description, categoryId)

    try {
      const newProduct = await ProductModel.createProduct({ name, price, photo, description, categoryId })
      console.log(newProduct)
      res.json(newProduct)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async createCategory(req: any, res: any) {
    try {
      const { name } = req.body

      console.log(req.body)
      const newCategory = await ProductModel.createCategory(name)
      res.json(newCategory)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async deleteCategory(req: any, res: any) {

    const { id } = req.params

    console.log(id)

    try {
      // Aquí asumo que `deleteCategory` está esperando un número
      const deletedCategory = await ProductModel.deleteCategory(id)

      console.log(deletedCategory)

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

    try {
      const ProductExist = await ProductModel.getProductByIdModel(id)

      if (!ProductExist) {
        return res.status(404).json({ error: "Product not found" })
      }

      const OrderExist = await ProductModel.getOrderProduct(id)

      console.log(OrderExist)

      if (OrderExist) {
        return res.status(200).json({ orderExist: "Hay un pedido con este producto" })
      }

      console.log(id)

      const deletedProduct = await ProductModel.deleteProduct(id)

      console.log(deletedProduct)

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
      const Categorys = await ProductModel.getCategorys()
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
import { Request, Response } from 'express'
import { uploadImg } from '../../services/cloudinary'
import { ProductModel } from './products.model'

export class Products {

  static async getProducts(req: Request, res: Response) {
    const { companyId } = req.user

    try {
      if (companyId) {
        const products = await ProductModel.getProducts({ companyId })
        res.json(products)
      }
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getProductsByCompanyName(req: Request, res: Response) {

    const { companyName } = req.params

    try {
      const products = await ProductModel.getProductsByCompanyName({ companyName })
      res.json(products)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getProductsByCategory(req: Request, res: Response) {
    try {
      const products = await ProductModel.getProductsByCategory(Number(req.params.id))
      res.json(products)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getProductById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const Oneproduct = await ProductModel.getProductByIdModel(Number(id))
      res.json(Oneproduct)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async updateProductById(req: Request, res: Response) {
    const { id } = req.params
    const { data } = req.body
    try {
      const product = await ProductModel.updateProductByIdModel(Number(id), data)
      res.json(product)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async createProduct(req: Request, res: Response) {

    const { companyId } = req.user
    const { name, price, photo, description, categoryId } = req.body

    console.log(req.body)
    try {

      if (companyId) {
        const newProduct = await ProductModel.createProduct({ name, price, photo, description, categoryId, companyId })

        if (!newProduct) {
          return res.json({ error: 'error al crear el producto' })
        }
        res.json(newProduct)
      }
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async createCategory(req: Request, res: Response) {
    const { companyId } = req.user
    const { name } = req.body



    try {
      if (companyId) {
        const newCategory = await ProductModel.createCategory({ name, companyId })
        res.json(newCategory)
      }
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async deleteCategory(req: Request, res: Response) {

    const { id } = req.params

    console.log(id)

    try {
      // Aquí asumo que `deleteCategory` está esperando un número
      const deletedCategory = await ProductModel.deleteCategory(Number(id))

      console.log(deletedCategory)

      if (!deletedCategory) {
        return res.status(500).json({ error: "Error deleting category" })
      }

      res.json(deletedCategory)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async deleteProduct(req: Request, res: Response) {

    const { id } = req.params

    try {
      const ProductExist = await ProductModel.getProductByIdModel(Number(id))

      if (!ProductExist) {
        return res.status(404).json({ error: "Product not found" })
      }

      const OrderExist = await ProductModel.getOrderProduct(Number(id))

      if (OrderExist) {
        return res.status(200).json({ orderExist: "Hay un pedido con este producto" })
      }

      const deletedProduct = await ProductModel.deleteProduct(Number(id))

      if (!deletedProduct) {
        return res.status(500).json({ error: "Error deleting Product" })
      }

      res.json(deletedProduct)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async getCategorys(req: Request, res: Response) {

    const { companyId } = req.user
    try {
      if (companyId) {
        const Categorys = await ProductModel.getCategorys(companyId)
        res.json(Categorys)
      }
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async saveImage(req: Request, res: Response) {
    if (req.file && req.file.path) {
      const url = await uploadImg(req.file.path)

      console.log(url)

      return res.json(url)
    }

    console.log('pq llega hasta aqui? xd')
  }
}
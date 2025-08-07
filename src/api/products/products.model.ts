import { prisma } from '../../utils/prisma'
import { Product, ProductUpdate } from './types'



export class ProductModel {
  static async getProducts({ companyId }: { companyId: number }) {
    const products = await prisma.product.findMany({
      where: {
        companyId
      },
      include: {
        category: true
      }
    })
    return products
  }

  static async getProductsByCompanyName({ companyName }: { companyName: string }) {

    const categorys = await prisma.category.findMany({
      where: {
        Company: {
          name: companyName
        }
      }
    })

    const products = await prisma.product.findMany({
      where: {
        Company: {
          name: companyName
        }
      },
      include: {
        category: true
      }
    })
    return { products, categorys }
  }

  static async getProductsByCategory(categoryId: number) {
    const products = await prisma.product.findMany({
      where: {
        categoryId: Number(categoryId)
      },
      include: {
        category: true
      }
    })
    return products
  }


  static async getProductByIdModel(id: number) {
    const product = await prisma.product.findFirst({
      where: {
        id
      },
      include: {
        category: true
      }
    })
    return product
  }

  static async getOrderProduct(id: number) {

    const orderExist = await prisma.order_Detail.findFirst({
      where: {
        productId: id
      }
    })
    return orderExist
  }

  static async updateProductByIdModel(id: number, data: ProductUpdate) {
    const product = await prisma.product.update({
      where: {
        id
      },
      include: {
        category: true
      },
      data
    })
    return product
  }

  static async createProduct({ name, price, photo, description, categoryId, companyId }: Product) {

    try {
      console.log(companyId)

      const newProduct = await prisma.product.create({
        data: {
          name,
          price: Number(price),
          photo,
          description,
          categoryId,
          companyId
        },
        include: {
          category: true
        }
      })

      console.log(newProduct)

      return newProduct

    } catch (error) {
      console.log(error)
    }

  }

  static async createCategory({ name, companyId }: { name: string, companyId: number }) {

    const newCategory = await prisma.category.create({
      data: {
        name,
        companyId
      }
    })

    return newCategory
  }

  static async deleteCategory(id: number) {

    const deletedCategory = await prisma.category.delete({
      where: {
        id: id
      }
    })
    return deletedCategory
  }

  static async deleteProduct(id: number) {

    const deletedProduct = await prisma.product.delete({
      where: {
        id
      }
    })

    // introducir eliminacion de foto en cloudinary al eliminar la foto

    return deletedProduct
  }

  static async getCategorys(companyId: number) {

    const Categorys = await prisma.category.findMany({
      where: {
        companyId
      }
    })

    return Categorys
  }

}
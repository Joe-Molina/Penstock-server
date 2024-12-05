import { prisma } from '../../utils/prisma'
import { Product } from './types'



export class productModel {
  static async getProducts() {
    const products = await prisma.product.findMany()
    return products
  }


  static async getProductByIdModel({ id }: Product) {
    const product: Product | null = await prisma.product.findFirst({
      where: {
        id
      }
    })
    return product
  }

  static async createProduct({ name, price, photo, description, categoryId }: Product) {

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        photo,
        description,
        categoryId
      }
    })
    return newProduct
  }

  static async createCategory(name: string) {

    const newCategory = await prisma.category.create({
      data: {
        name
      }
    })
    return newCategory
  }

  static async deleteCategory(id: number) {

    const deletedCategory = await prisma.category.delete({
      where: {
        id
      }
    })
    return deletedCategory
  }

  static async getCategorys() {

    const Categorys = await prisma.category.findMany()
    return Categorys
  }

}
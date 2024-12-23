"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const prisma_1 = require("../../utils/prisma");
class ProductModel {
    static getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma_1.prisma.product.findMany({
                include: {
                    category: true
                }
            });
            return products;
        });
    }
    static getProductsByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma_1.prisma.product.findMany({
                where: {
                    categoryId: Number(categoryId)
                },
                include: {
                    category: true
                }
            });
            return products;
        });
    }
    static getProductByIdModel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_1.prisma.product.findFirst({
                where: {
                    id: Number(id)
                },
                include: {
                    category: true
                }
            });
            return product;
        });
    }
    static updateProductByIdModel(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_1.prisma.product.update({
                where: {
                    id: Number(id)
                },
                data
            });
            return product;
        });
    }
    static createProduct(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, price, photo, description, categoryId }) {
            const newProduct = yield prisma_1.prisma.product.create({
                data: {
                    name,
                    price: Number(price),
                    photo,
                    description,
                    categoryId: Number(categoryId)
                }
            });
            return newProduct;
        });
    }
    static createCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield prisma_1.prisma.category.create({
                data: {
                    name
                }
            });
            return newCategory;
        });
    }
    static deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield prisma_1.prisma.category.delete({
                where: {
                    id: Number(id)
                }
            });
            return deletedCategory;
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield prisma_1.prisma.product.delete({
                where: {
                    id: Number(id)
                }
            });
            return deletedProduct;
        });
    }
    static getCategorys() {
        return __awaiter(this, void 0, void 0, function* () {
            const Categorys = yield prisma_1.prisma.category.findMany();
            return Categorys;
        });
    }
}
exports.ProductModel = ProductModel;

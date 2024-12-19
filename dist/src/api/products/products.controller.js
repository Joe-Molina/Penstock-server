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
exports.Products = void 0;
const products_model_1 = require("./products.model");
class Products {
    static getProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_model_1.ProductModel.getProducts();
                res.json(products);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static getProductsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_model_1.ProductModel.getProductsByCategory(req.params.id);
                res.json(products);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const Oneproduct = yield products_model_1.ProductModel.getProductByIdModel(id);
                res.json(Oneproduct);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static updateProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body.data;
            try {
                const product = yield products_model_1.ProductModel.updateProductByIdModel(id, data);
                res.json(product);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, photo, description, categoryId } = req.body.credentials;
            console.log(name, price, photo, description, categoryId);
            try {
                const newProduct = yield products_model_1.ProductModel.createProduct({ name, price, photo, description, categoryId });
                console.log(newProduct);
                res.json(newProduct);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const newCategory = yield products_model_1.ProductModel.createCategory(name);
                res.json(newCategory);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                // Aquí asumo que `deleteCategory` está esperando un número
                const deletedCategory = yield products_model_1.ProductModel.deleteCategory(id);
                if (!deletedCategory) {
                    return res.status(500).json({ error: "Error deleting category" });
                }
                res.json(deletedCategory);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ProductExist = yield products_model_1.ProductModel.getProductByIdModel(id);
            if (!ProductExist) {
                return res.status(404).json({ error: "Product not found" });
            }
            try {
                // Aquí asumo que `deleteCategory` está esperando un número
                const deletedProduct = yield products_model_1.ProductModel.deleteProduct(id);
                if (!deletedProduct) {
                    return res.status(500).json({ error: "Error deleting Product" });
                }
                res.json(deletedProduct);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
    static getCategorys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Categorys = yield products_model_1.ProductModel.getCategorys();
                // res.json('hola')
                res.json(Categorys);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static saveImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filename } = req.file;
            console.log(filename);
            res.json({ filename });
        });
    }
}
exports.Products = Products;

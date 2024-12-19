"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "uploads/");
    },
    filename: function (_req, file, cb) {
        const extname = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + extname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.get("/", products_controller_1.Products.getProducts);
router.get("/get_by_category/:id", products_controller_1.Products.getProductsByCategory);
router.get("/search/:id", products_controller_1.Products.getProductById);
router.post("/create", products_controller_1.Products.createProduct);
router.post("/update/:id", products_controller_1.Products.updateProductById);
router.delete("/delete/:id", products_controller_1.Products.deleteProduct);
router.get("/categorys", products_controller_1.Products.getCategorys);
router.post("/category/create", products_controller_1.Products.createCategory);
router.delete("/category/delete/:id", products_controller_1.Products.deleteCategory);
router.post("/save/image", upload.single("file"), products_controller_1.Products.saveImage);
exports.default = router;

import { Router } from "express";
import { Products } from "./products.controller";
import multer from "multer";
import path from "path";

const router = Router();
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extname);
  },
});
const upload = multer({ storage });

router.get("/", Products.getProducts);
router.get("/get_by_category/:id", Products.getProductsByCategory);
router.get("/search/:id", Products.getProductById);
router.post("/create", Products.createProduct);
router.post("/update/:id", Products.updateProductById);
router.delete("/delete/:id", Products.deleteProduct);

router.get("/categorys", Products.getCategorys);
router.post("/category/create", Products.createCategory);
router.delete("/category/delete/:id", Products.deleteCategory);

router.post("/save/image", upload.single("file"), Products.saveImage);

export default router;

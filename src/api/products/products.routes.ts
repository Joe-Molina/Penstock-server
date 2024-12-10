import { Router } from "express";
import { products } from "./products.controller";
import multer from "multer";
import path from "path";

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extname);
  },
});
const upload = multer({ storage });

router.get("/", products.getProducts);
router.get("/:id", products.getProductById);
router.post("/create", products.createProduct);
router.delete("/delete/:id", products.deleteProduct);

router.get("/categorys", products.getCategorys);
router.post("/category/create", products.createCategory);
router.delete("/category/delete/:id", products.deleteCategory);

router.post("/save/image", upload.single("file"), products.saveImage);

export default router;

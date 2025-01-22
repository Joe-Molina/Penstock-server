import { Router } from "express";
import { Products } from "./products.controller";

const router = Router();

router.get("/by_company/:companyName", Products.getProductsByCompanyName);

export default router;

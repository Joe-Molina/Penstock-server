import { Router } from "express";
import { Auth } from "./auth.controller";
import { authMiddleware } from "../../services/authMiddleware";

const router = Router();
router.post("/register", Auth.registerUser);
router.post("/login/", Auth.login);
router.get("/logout", Auth.logout);
router.post("/register_company", authMiddleware, Auth.registerCompany);
router.get("/me", authMiddleware, Auth.me)

export default router;

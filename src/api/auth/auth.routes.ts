import { Router } from "express";
import { Auth } from "./auth.controller";

const router = Router();
router.post("/register_user", Auth.registerUser);
router.post("/register_company", Auth.registerCompany);
router.post("/login/", Auth.login);
router.get("/logout", Auth.logout);


export default router;

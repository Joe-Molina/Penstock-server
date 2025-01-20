import { Router } from "express";
import { Auth } from "./auth.controller";

const router = Router();

router.post("/login/", Auth.login);
router.get("/logout", Auth.logout);
router.get("/user_info", Auth.userInfo);
router.get("/nav_info", Auth.NavInfo);


export default router;

import { Router } from "express";
import { Auth } from "./auth.controller";

const router = Router();

router.post("/register_client", Auth.registerClient);

router.post("/register_seller", Auth.registerSeller);

router.get("/get_sellers", Auth.getSellers);

router.delete("/delete_seller/:id", Auth.deleteSeller);

router.post("/register_admin", Auth.registerAdmin);

router.post("/login/", Auth.login);

router.get("/logout", Auth.logout);

router.post("/protected", Auth.protected);

router.get("/protected2", Auth.protected2);

router.post("/seller_assigment", Auth.assignSeller);

export default router;

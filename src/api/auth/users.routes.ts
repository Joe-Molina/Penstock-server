import { Router } from "express";
import { Auth } from "./auth.controller";

const router = Router();
router.post("/register_admin", Auth.registerAdmin);

router.get("/get_sellers", Auth.getSellers);
router.post("/register_seller", Auth.registerSeller);
router.delete("/delete_seller/:id", Auth.deleteSeller);
router.get("/restore_seller/:id", Auth.restoreSeller);

router.get("/get_clients", Auth.getClients);
router.post("/client/register", Auth.registerClient);
router.delete("/delete_client/:id", Auth.deleteClient);
router.get("/restore_client/:id", Auth.restoreClient);
router.post("/seller_assigment", Auth.assignSeller);

export default router;

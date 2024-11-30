import { Router } from "express";
import { Orders } from "./orders.controller";

const router = Router();

router.get("/getOrders", Orders.getAllOrders);
router.get("/getClientOrders", Orders.getClientOrdersByClient);
router.post("/getClientOrdersBySeller", Orders.getAllClientOrdersBySeller);

router.post("/clientcreateorder", Orders.ClientcreateOrder);
router.post("/adminCreateOrder", Orders.AdmincreateOrder);

router.post("/createInvoice", Orders.createInvoice);
router.get("/getallInvoices", Orders.getAllInvoices);

export default router;

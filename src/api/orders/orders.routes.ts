import { Router } from "express";
import { Orders } from "./orders.controller";

const router = Router();

router.get("/getOrders", Orders.getAllOrders);
router.get("/getallInvoices", Orders.getAllInvoices);

router.post("/createorder", Orders.createOrder);
router.post("/createInvoice", Orders.createInvoice);

export default router;

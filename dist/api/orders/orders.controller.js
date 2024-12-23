"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const dataUser_1 = require("../../services/dataUser");
const orders_model_1 = require("./orders.model");
class Orders {
    static getAllOrders(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orders_model_1.OrdersModel.getOrders();
                res.json(orders);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static getAllClientOrdersBySeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (0, dataUser_1.dataUser)(req.cookies.access_token);
            if (data != false) {
                if (data.role == "admin") {
                    const { sellerId } = req.params;
                    const clientsIds = yield orders_model_1.OrdersModel.getAssignedCustomersIds(sellerId);
                    const clientsOrders = yield orders_model_1.OrdersModel.getOrders_fromAssignedCustomers(clientsIds);
                    res.json(clientsOrders);
                }
                else if (data.role == "seller") {
                    const clientsIds = yield orders_model_1.OrdersModel.getAssignedCustomersIds(data.id);
                    const clientsOrders = yield orders_model_1.OrdersModel.getOrders_fromAssignedCustomers(clientsIds);
                    res.json(clientsOrders);
                }
            }
            else {
                res.status(401).json({ error: "no autenticado" });
            }
        });
    }
    static getClientOrdersByClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (0, dataUser_1.dataUser)(req.cookies.access_token);
            try {
                if (data != false) {
                    const orders = yield orders_model_1.OrdersModel.getOrdersByClientId(data.id);
                    res.json(orders);
                }
                else {
                    res.status(401).json({ error: "no autenticado" });
                }
                const orders = yield orders_model_1.OrdersModel.getOrdersByClientId(req.params.id);
                res.json(orders);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static ClientcreateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (0, dataUser_1.dataUser)(req.cookies.access_token);
            try {
                if (data != false) {
                    const order = yield orders_model_1.OrdersModel.createOrder(data.id, req.body.details);
                    res.json(order);
                }
                else {
                    res.status(401).json({ error: "no autenticado" });
                }
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static AdmincreateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId, data } = req.body;
            const data2 = data.map(({ productId, amount }) => {
                return { productId, amount };
            });
            try {
                const order = yield orders_model_1.OrdersModel.createOrder(clientId, data2);
                console.log(order);
                res.json(order);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static createInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoice = yield orders_model_1.OrdersModel.createInvocie(req.body.invoice_number, req.body.orderId);
                res.json(invoice);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static getAllInvoices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoices = yield orders_model_1.OrdersModel.getAllInvocies();
                res.json(invoices);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
}
exports.Orders = Orders;

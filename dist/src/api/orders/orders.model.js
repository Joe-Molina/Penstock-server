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
exports.OrdersModel = void 0;
const prisma_1 = require("../../utils/prisma");
class OrdersModel {
    static getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma_1.prisma.order.findMany({
                include: {
                    Order_Detail: true,
                    client: {
                        select: {
                            name: true
                        },
                    },
                },
            });
            return orders;
        });
    }
    static getOrders_fromAssignedCustomers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma_1.prisma.order.findMany({
                where: {
                    clientId: {
                        in: ids,
                    },
                },
                include: {
                    Order_Detail: true,
                },
            });
            return orders;
        });
    }
    static getAssignedCustomersIds(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield prisma_1.prisma.salesperson_assignment.findMany({
                where: {
                    sellerId: id,
                },
                select: {
                    clientId: true,
                },
            });
            return clients;
        });
    }
    static getOrdersByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma_1.prisma.order.findMany({
                where: {
                    clientId,
                },
                include: {
                    Order_Detail: true,
                },
            });
            return orders;
        });
    }
    static getOrderById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const order = yield prisma_1.prisma.order.findFirst({
                where: {
                    id,
                },
                include: {
                    Order_Detail: true,
                },
            });
            return order;
        });
    }
    static createOrder(clientId, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = yield prisma_1.prisma.order.create({
                data: {
                    clientId,
                    revised: true,
                    Order_Detail: {
                        createMany: {
                            data: details,
                        },
                    },
                },
                include: {
                    Order_Detail: true,
                },
            });
            return newOrder;
        });
    }
    static createInvocie(invoice_number, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInvoice = yield prisma_1.prisma.invoice.create({
                data: {
                    invoice_number,
                    orderId,
                },
            });
            return newInvoice;
        });
    }
    static getAllInvocies() {
        return __awaiter(this, void 0, void 0, function* () {
            const Invoices = yield prisma_1.prisma.invoice.findMany();
            return Invoices;
        });
    }
}
exports.OrdersModel = OrdersModel;

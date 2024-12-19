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
exports.AuthModel = void 0;
const prisma_1 = require("../../utils/prisma");
class AuthModel {
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({
                where: {
                    id,
                },
            });
            return user;
        });
    }
    static getAllSellers() {
        return __awaiter(this, void 0, void 0, function* () {
            const ActivesUsers = yield prisma_1.prisma.seller.findMany({
                include: {
                    user: true
                },
                where: {
                    user: {
                        status: true
                    }
                }
            });
            const InactiveUsers = yield prisma_1.prisma.seller.findMany({
                include: {
                    user: true
                },
                where: {
                    user: {
                        status: false
                    }
                }
            });
            return { ActivesUsers, InactiveUsers };
        });
    }
    static getAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const ActiveClients = yield prisma_1.prisma.client.findMany({
                include: {
                    user: true,
                    salesperson_assignment: {
                        include: {
                            seller: true
                        }
                    }
                },
                where: {
                    user: {
                        status: true
                    }
                }
            });
            const InactiveClients = yield prisma_1.prisma.client.findMany({
                include: {
                    user: true,
                    salesperson_assignment: {
                        include: {
                            seller: true
                        }
                    }
                },
                where: {
                    user: {
                        status: false
                    }
                }
            });
            return { ActiveClients, InactiveClients };
        });
    }
    static deleteSeller(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield prisma_1.prisma.seller.findFirst({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });
            if (!seller)
                return;
            const user = yield prisma_1.prisma.user.update({
                where: {
                    id: seller.userId,
                },
                data: {
                    status: false
                },
            });
            return user;
        });
    }
    static RestoreSeller(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield prisma_1.prisma.seller.findFirst({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });
            if (!seller)
                return;
            const user = yield prisma_1.prisma.user.update({
                where: {
                    id: seller.userId,
                },
                data: {
                    status: true
                },
            });
            return user;
        });
    }
    static deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield prisma_1.prisma.client.findFirst({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });
            if (!seller)
                return;
            const user = yield prisma_1.prisma.user.update({
                where: {
                    id: seller.userId,
                },
                data: {
                    status: false
                },
            });
            return user;
        });
    }
    static RestoreClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield prisma_1.prisma.client.findFirst({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });
            if (!seller)
                return;
            const user = yield prisma_1.prisma.user.update({
                where: {
                    id: seller.userId,
                },
                data: {
                    status: true
                },
            });
            return user;
        });
    }
    static findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({
                where: {
                    username,
                },
            });
            return user;
        });
    }
    static createClient(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, email, role, name, lastname, store, address, sellerId, }) {
            console.log({
                username,
                password,
                email,
                role,
                name,
                lastname,
                store,
                address,
                sellerId,
            });
            const newClient = yield prisma_1.prisma.user.create({
                data: {
                    username,
                    password,
                    email,
                    role,
                    client: {
                        create: {
                            name,
                            lastname,
                            store,
                            address,
                            salesperson_assignment: {
                                create: {
                                    sellerId,
                                },
                            },
                        },
                    },
                },
            });
            return {
                username: newClient.username,
                email: newClient.email,
            };
        });
    }
    static createSeller(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, email, name, role, lastname, }) {
            const newClient = yield prisma_1.prisma.user.create({
                data: {
                    username,
                    password,
                    email,
                    role,
                    Seller: {
                        create: {
                            name,
                            lastname,
                        },
                    },
                },
            });
            return {
                username: newClient.username,
                email: newClient.email,
            };
        });
    }
    static createAdmin(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, password, email, role }) {
            const newUser = yield prisma_1.prisma.user.create({
                data: {
                    username,
                    password,
                    email,
                    role,
                },
            });
            return {
                username: newUser.username,
                email: newUser.email,
            };
        });
    }
    static assignSeller(clientId, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const asignment = yield prisma_1.prisma.salesperson_assignment.create({
                data: {
                    clientId,
                    sellerId,
                },
            });
            return asignment;
        });
    }
}
exports.AuthModel = AuthModel;

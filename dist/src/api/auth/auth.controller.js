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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const auth_model_1 = require("./auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
const dataUser_1 = require("../../services/dataUser");
class Auth {
    static registerClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { name, lastname, username, email, password, sellerId, store, address, } = req.body.credentials;
            try {
                // Verifica si el usuario ya existe
                const userExist = yield auth_model_1.AuthModel.findUserByUsername(username);
                console.log(userExist);
                if (userExist) {
                    return res.status(400).json({ alert: "This user already exists", userExist });
                }
                // Hashea la contraseña
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Crea un objeto cliente
                const client = {
                    username,
                    password: hashedPassword,
                    email,
                    name,
                    lastname,
                    store,
                    address,
                    role: "client",
                    sellerId: Number(sellerId),
                };
                console.log(client);
                // Intenta registrar al cliente
                const newClient = yield auth_model_1.AuthModel.createClient(client);
                if (!newClient) {
                    return res.status(500).json({ error: "Error registering client" });
                }
                // Responde con el cliente registrado
                return res.status(201).json(newClient);
            }
            catch (err) {
                console.error("Error during client registration:", err);
                return res.status(500).json({ error: "Internal Server Error", details: err.message });
            }
        });
    }
    static registerSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, name, lastname } = req.body.credentials;
            try {
                const userExist = yield auth_model_1.AuthModel.findUserByUsername(username);
                console.log(userExist);
                if (userExist) {
                    return res.status(400).json({ alert: "This user already exists" });
                }
                const hashedPassword = bcrypt_1.default.hashSync(password, 10);
                const client = {
                    username,
                    password: hashedPassword,
                    email,
                    name,
                    role: "seller",
                    lastname,
                };
                const newSeller = yield auth_model_1.AuthModel.createSeller(client);
                if (!newSeller) {
                    return res.status(500).json({ error: "Error registering client" });
                }
                res.json(newSeller);
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static registerAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = req.body;
            try {
                const userExist = yield auth_model_1.AuthModel.findUserByUsername(username);
                if (userExist) {
                    res.json({ alert: "this user already exist" });
                }
                else {
                    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
                    const admin = {
                        username,
                        password: hashedPassword,
                        email,
                        role,
                    };
                    const newSeller = yield auth_model_1.AuthModel.createAdmin(admin);
                    res.json(newSeller);
                }
            }
            catch (err) {
                res.json({ error: err });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body.credentials;
            try {
                const user = yield auth_model_1.AuthModel.findUserByUsername(username);
                if (user) {
                    const token = jsonwebtoken_1.default.sign({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        loged: true,
                    }, config_1.JWT_SECRET_KEY, {
                        expiresIn: "7d",
                    });
                    const matchPassword = bcrypt_1.default.compareSync(password, user.password);
                    if (matchPassword) {
                        res
                            .cookie("access_token", token, {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60, // 1 hour
                        })
                            .json({ message: "cookie set", loged: true });
                    }
                    else {
                        res.json({ message: "incorrect password", loged: false });
                    }
                }
                else {
                    console.log(" no hay user");
                    res.json({ message: "user not found", loged: false });
                }
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    static logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("access_token");
            res.send("coockie is cleared correctly");
        });
    }
    static protected(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (0, dataUser_1.dataUser)(req.body.key);
                if (response) {
                    res.json(response);
                }
                else {
                    res.json({ response: false });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static getSellers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellers = yield auth_model_1.AuthModel.getAllSellers();
                if (sellers) {
                    res.json(sellers);
                }
                else {
                    res.json({ response: false });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static getClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield auth_model_1.AuthModel.getAllClients();
                if (clients) {
                    res.json(clients);
                }
                else {
                    res.json({ response: false });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static deleteSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellers = yield auth_model_1.AuthModel.deleteSeller(Number(req.params.id));
                if (sellers) {
                    res.json(sellers);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static restoreSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellers = yield auth_model_1.AuthModel.RestoreSeller(Number(req.params.id));
                if (sellers) {
                    res.json(sellers);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield auth_model_1.AuthModel.deleteClient(Number(req.params.id));
                if (client) {
                    res.json(client);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static restoreClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield auth_model_1.AuthModel.RestoreClient(Number(req.params.id));
                if (client) {
                    res.json(client);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static protected2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.cookies.access_token);
                const data = (0, dataUser_1.dataUser)(req.cookies.access_token);
                // const data = dataUser(req.cookies.access_token);
                console.log(data);
                if (data) {
                    res.json(data);
                }
                else {
                    res.json({ response: false });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    static assignSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sellerId, clientId } = req.body;
            try {
                const asignment = yield auth_model_1.AuthModel.assignSeller(clientId, sellerId);
                res.json(asignment);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
}
exports.Auth = Auth;

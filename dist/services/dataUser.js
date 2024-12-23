"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = "el_mejor_secreto_del_mundo_mundiall";
const dataUser = (key) => {
    if (!key) {
        return false;
    }
    else {
        const user = jsonwebtoken_1.default.verify(key, JWT_SECRET_KEY);
        return user;
    }
};
exports.dataUser = dataUser;

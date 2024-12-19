"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const dataUser = (key) => {
    if (!key) {
        return false;
    }
    else {
        const user = jsonwebtoken_1.default.verify(key, config_1.JWT_SECRET_KEY);
        return user;
    }
};
exports.dataUser = dataUser;

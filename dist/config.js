"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = void 0;
_a = process.env.JWT_SECRET_KEY, exports.JWT_SECRET_KEY = _a === void 0 ? "el_mejor_secreto_del_mundo_mundiall" : _a;

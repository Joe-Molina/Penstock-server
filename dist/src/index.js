"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const products_routes_1 = __importDefault(require("./api/products/products.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const orders_routes_1 = __importDefault(require("./api/orders/orders.routes"));
const path_1 = __importDefault(require("path"));
const corsOptions = {
    origin: ["http://localhost:3001", 'http://tzw6fl0d-3001.use2.devtunnels.ms'], // El dominio desde donde haces las solicitudes
    credentials: true, // Permite el envío de cookies
};
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_routes_1.default);
app.use("/products", products_routes_1.default);
app.use("/orders", orders_routes_1.default);
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

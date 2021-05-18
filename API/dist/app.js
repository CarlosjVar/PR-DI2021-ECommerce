"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./config/constants");
const router_1 = __importDefault(require("./routes/router"));
const app = express_1.default();
//Body parser
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/api', router_1.default);
app.listen(constants_1.PORT, () => {
    console.log("Server running in port ", constants_1.PORT);
});
console.log("Server running");

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentAuth = void 0;
const getCurrentAuth = (req, res) => {
    res.json({ user: req.user, isAdmin: req.isAdmin });
};
exports.getCurrentAuth = getCurrentAuth;

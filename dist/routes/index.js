"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/indexRoutes.ts
const express_1 = require("express");
const index_1 = require("../controllers/index");
const router = (0, express_1.Router)();
router.get('/', (req, res) => (0, index_1.getIndex)(req, res));
exports.default = router;

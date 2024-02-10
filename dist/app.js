"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// Load environment variables from a .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = parseInt(process.env.PORT, 10) || 3000;
// Enable Helmet for additional security headers
app.use((0, helmet_1.default)());
// Use rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Use CORS middleware if needed
// const cors = require('cors');
// app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/tasks', taskRoutes_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
exports.server = server;

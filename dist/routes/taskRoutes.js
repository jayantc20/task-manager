"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskSanatizationMiddleware_1 = require("../middleware/taskSanatizationMiddleware");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.get('/', taskController_1.getAllTasks);
router.get('/:id', taskController_1.getTaskById);
router.post('/', (0, taskSanatizationMiddleware_1.sanitizeInputsForCreate)(), taskController_1.createTask); // sanitizeInputs()
router.put('/:id', (0, taskSanatizationMiddleware_1.sanitizeInputsForUpdate)(), taskController_1.updateTask); // sanitizeInputs()
router.delete('/:id', taskController_1.deleteTask);
router.get('/priority/:level', (0, taskSanatizationMiddleware_1.sanitizePriorityParam)(), taskController_1.getTasksByPriority);
exports.default = router;

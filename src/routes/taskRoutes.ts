import { Router, Request, Response } from 'express';
import { 
  sanitizeInputsForCreate, 
  sanitizeInputsForUpdate,
  sanitizePriorityParam
  // sanitizeInputs
} from '../middleware/taskSanatizationMiddleware';

import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksByPriority,
  } from '../controllers/taskController';

const router: Router = Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', sanitizeInputsForCreate(), createTask); // sanitizeInputs()
router.put('/:id', sanitizeInputsForUpdate(), updateTask); // sanitizeInputs()
router.delete('/:id', deleteTask);
router.get('/priority/:level', sanitizePriorityParam(), getTasksByPriority);

export default router;

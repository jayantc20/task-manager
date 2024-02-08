import { Router, Request, Response } from 'express';
import { 
  // sanitizeInputsForCreate, 
  // sanitizeInputsForUpdate 
  sanitizeInputs
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
router.post('/', sanitizeInputs(), createTask);
router.put('/:id', sanitizeInputs(), updateTask);
router.delete('/:id', deleteTask);
router.get('/priority/:level', getTasksByPriority);

export default router;

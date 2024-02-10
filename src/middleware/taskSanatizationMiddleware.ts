import { Request, Response, NextFunction } from 'express';
import { validationResult, body, param } from 'express-validator';

export const sanitizeInputsForCreate = () => [
  // Sanitize and validate each input field
  body('title').escape().trim().notEmpty().withMessage('Title is required'),
  body('description').escape().trim().notEmpty().withMessage('Description is required'),
  body('priority').escape().toLowerCase().notEmpty().withMessage('Priority is required')
  .isIn(['low', 'medium', 'high']).withMessage('priority should be low or medium or high'),
  body('completed')
  .toBoolean()
  .notEmpty().withMessage('completed is required')
  .isIn([true, false]).withMessage('completed must be true or false'),
  // Handle the validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, respond with a 400 status and the error details
      return res.status(400).json({ errors: errors.array() });
    }

    // No errors, continue to the next middleware or route handler
    next();
  },
];

//TODO: Confirm
export const sanitizeInputsForUpdate = () => [
  param('id').isInt().withMessage('Task ID must be an integer'),

    // At least one of these fields should be present and not empty
    body().custom((value, { req }) => {
      const { title, description, priority, completed } = req.body;
  
      if (!title && !description && !priority && completed === undefined) {
        throw new Error('At least one field (title, description, priority, completed) must be present and not empty');
      }
  
      return true;
    }).withMessage('At least one field (title, description, priority, completed) must be present and not empty'),
  
  body('title').optional().escape().trim().notEmpty().withMessage('Title is required'),
  body('description').optional().escape().trim().notEmpty().withMessage('Description is required'),
  body('priority').optional().escape().toLowerCase().notEmpty().withMessage('Priority is required')
  .isIn(['low', 'medium', 'high']).withMessage('priority should be low or medium or high'),
  body('completed')
    .optional()
    .toBoolean()
    .notEmpty().withMessage('Completed is required')
    .isIn([true, false]).withMessage('Completed must be true or false'),

  // Handle the validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, respond with a 400 status and the error details
      return res.status(400).json({ errors: errors.array() });
    }

    // No errors, continue to the next middleware or route handler
    next();
  },
];

export const sanitizePriorityParam = () => [
  param('level')
    .escape()
    .trim()
    .notEmpty().withMessage('Priority level is required')
    .isIn(['low', 'medium', 'high']).withMessage('Priority level should be low, medium, or high'),
  
  // Handle the validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, respond with a 400 status and the error details
      return res.status(400).json({ errors: errors.array() });
    }

    // No errors, continue to the next middleware or route handler
    next();
  },
];
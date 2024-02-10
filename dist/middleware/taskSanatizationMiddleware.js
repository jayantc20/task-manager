"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizePriorityParam = exports.sanitizeInputsForUpdate = exports.sanitizeInputsForCreate = void 0;
const express_validator_1 = require("express-validator");
const sanitizeInputsForCreate = () => [
    // Sanitize and validate each input field
    (0, express_validator_1.body)('title').escape().trim().notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').escape().trim().notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('priority').escape().toLowerCase().notEmpty().withMessage('Priority is required')
        .isIn(['low', 'medium', 'high']).withMessage('priority should be low or medium or high'),
    (0, express_validator_1.body)('completed')
        .toBoolean()
        .notEmpty().withMessage('completed is required')
        .isIn([true, false]).withMessage('completed must be true or false'),
    // Handle the validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, respond with a 400 status and the error details
            return res.status(400).json({ errors: errors.array() });
        }
        // No errors, continue to the next middleware or route handler
        next();
    },
];
exports.sanitizeInputsForCreate = sanitizeInputsForCreate;
//TODO: Confirm
const sanitizeInputsForUpdate = () => [
    (0, express_validator_1.param)('id').isInt().withMessage('Task ID must be an integer'),
    // At least one of these fields should be present and not empty
    (0, express_validator_1.body)().custom((value, { req }) => {
        const { title, description, priority, completed } = req.body;
        if (!title && !description && !priority && completed === undefined) {
            throw new Error('At least one field (title, description, priority, completed) must be present and not empty');
        }
        return true;
    }).withMessage('At least one field (title, description, priority, completed) must be present and not empty'),
    (0, express_validator_1.body)('title').optional().escape().trim().notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').optional().escape().trim().notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('priority').optional().escape().toLowerCase().notEmpty().withMessage('Priority is required')
        .isIn(['low', 'medium', 'high']).withMessage('priority should be low or medium or high'),
    (0, express_validator_1.body)('completed')
        .optional()
        .toBoolean()
        .notEmpty().withMessage('Completed is required')
        .isIn([true, false]).withMessage('Completed must be true or false'),
    // Handle the validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, respond with a 400 status and the error details
            return res.status(400).json({ errors: errors.array() });
        }
        // No errors, continue to the next middleware or route handler
        next();
    },
];
exports.sanitizeInputsForUpdate = sanitizeInputsForUpdate;
const sanitizePriorityParam = () => [
    (0, express_validator_1.param)('level')
        .escape()
        .trim()
        .notEmpty().withMessage('Priority level is required')
        .isIn(['low', 'medium', 'high']).withMessage('Priority level should be low, medium, or high'),
    // Handle the validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, respond with a 400 status and the error details
            return res.status(400).json({ errors: errors.array() });
        }
        // No errors, continue to the next middleware or route handler
        next();
    },
];
exports.sanitizePriorityParam = sanitizePriorityParam;

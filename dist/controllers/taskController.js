"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksByPriority = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const taskModel_1 = require("../models/taskModel");
const getAllTasks = (req, res) => {
    let filteredTasks = [...taskModel_1.tasks];
    const { completed, sortBy } = req.query;
    if (completed) {
        // Validate if the value is a boolean (true or false)
        const isCompleted = completed === 'true' ? true : completed === 'false' ? false : undefined;
        // Check if the value is a valid boolean
        if (isCompleted === undefined) {
            return res.status(400).json({ error: 'Invalid value for completed parameter. It should be a boolean.' });
        }
        // Filter tasks based on the completed parameter
        filteredTasks = filteredTasks.filter((task) => task.completed === isCompleted);
    }
    if (sortBy === 'createdAt') {
        // Sort tasks by createdAt if sortBy is specified
        filteredTasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    res.json(filteredTasks);
};
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = taskModel_1.tasks.find((t) => t.id === taskId);
    if (task) {
        res.json(task);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
};
exports.getTaskById = getTaskById;
const createTask = (req, res) => {
    const { title, description, completed, priority } = req.body;
    const newTask = {
        id: taskModel_1.tasks.length + 1,
        title,
        description,
        completed,
        priority,
        createdAt: new Date(),
    };
    taskModel_1.tasks.push(newTask);
    res.status(201).json(newTask);
};
exports.createTask = createTask;
const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskModel_1.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
        const { title, description, completed, priority } = req.body;
        const existingTask = taskModel_1.tasks[taskIndex];
        const updatedTask = {
            id: taskId,
            title,
            description,
            completed,
            priority,
            createdAt: existingTask.createdAt,
        };
        taskModel_1.tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskModel_1.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
        taskModel_1.tasks.splice(taskIndex, 1);
        res.json({ message: 'Task deleted successfully' });
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
};
exports.deleteTask = deleteTask;
const getTasksByPriority = (req, res) => {
    const priorityLevel = req.params.level.toLowerCase();
    const filteredTasks = taskModel_1.tasks.filter((task) => task.priority.toLowerCase() === priorityLevel);
    res.json(filteredTasks);
};
exports.getTasksByPriority = getTasksByPriority;
// // Filtering
// const completedQueryParam = req.query.completed as string | undefined;
// if (completedQueryParam !== undefined) {
//   const isCompleted = completedQueryParam.toLowerCase() === 'true';
//   filteredTasks = filteredTasks.filter((task) => task.completed === isCompleted);
// }

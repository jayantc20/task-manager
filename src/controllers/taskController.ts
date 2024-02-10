import { Request, Response } from 'express';
import { Task, tasks } from '../models/taskModel';

//TODO: Add pagination
export const getAllTasks = (req: Request, res: Response) => {
  let filteredTasks = [...tasks];

  const { completed, sortBy } = req.query;

  if (completed) {
    // Validate if the value is a boolean (true or false)
    const isCompleted =
      completed === 'true' ? true : completed === 'false' ? false : undefined;

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

export const getTaskById = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const createTask = (req: Request, res: Response) => {
  const { title, description, completed, priority } = req.body;

  const newTask: Task = {
    id: tasks.length + 1,
    title,
    description,
    completed,
    priority,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};


export const updateTask = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    const { title, description, completed, priority } = req.body;

    const existingTask = tasks[taskIndex];
    const updatedTask: Task = {
      id: taskId,
      title,
      description,
      completed,
      priority,
      createdAt: existingTask.createdAt,
    };

    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);

  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};


export const deleteTask = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    //TODO: Confirm
    // res.status(204).json();
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const getTasksByPriority = (req: Request, res: Response) => {
  const priorityLevel = req.params.level.toLowerCase();
  const filteredTasks = tasks.filter((task) => task.priority.toLowerCase() === priorityLevel);

  if (filteredTasks.length === 0) {
    // No tasks found, return 404
    return res.status(404).json({ message: 'No tasks found with the specified priority level' });
  }

  res.status(200).json(filteredTasks);
};


// // Filtering
// const completedQueryParam = req.query.completed as string | undefined;
// if (completedQueryParam !== undefined) {
//   const isCompleted = completedQueryParam.toLowerCase() === 'true';
//   filteredTasks = filteredTasks.filter((task) => task.completed === isCompleted);
// }
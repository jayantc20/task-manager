import tap from 'tap'
import supertest from 'supertest';
import { app, server } from '../../src/app';

// Hook to close the server after each test
tap.afterEach(async () => {
  // Close the server
  server.close();
});

const request = supertest(app);

tap.test('GET /api/v1/tasks should return all tasks', async (t) => {
  const response = await request.get('/api/v1/tasks');

  t.equal(response.status, 200, 'Should return a 200 status code');
  t.type(response.body, 'array', 'Response body should be an array');
  t.ok(response.body.length > 0, 'Response body should contain tasks');

  t.end();
});

tap.test('GET /api/v1/tasks/:id should return a single task by ID', async (t) => {
  const taskId = 1;
  const response = await request.get(`/api/v1/tasks/${taskId}`);

  t.equal(response.status, 200, 'Should return a 200 status code');
  t.type(response.body, 'object', 'Response body should be an object');
  t.equal(response.body.id, taskId, 'Response body should contain the correct task');

  t.end();
});

tap.test('GET /api/v1/tasks/:id should return 404 for non-existent task ID', async (t) => {
  const nonExistentTaskId = 999;
  const response = await request.get(`/api/v1/tasks/${nonExistentTaskId}`);

  t.equal(response.status, 404, 'Should return a 404 status code');
  t.equal(response.body.message, 'Task not found', 'Response body should contain an error message');

  t.end();
});

tap.test('POST /api/v1/tasks should create a new task', async (t) => {
  const newTask = {
    title: 'Test Task',
    description: 'This is a test task',
    completed: false,
    priority: 'low',
  };

  const response = await request
    .post('/api/v1/tasks')
    .send(newTask);

  t.equal(response.status, 201, 'Should return a 201 status code');
  t.type(response.body, 'object', 'Response body should be an object');
  t.equal(response.body.title, newTask.title, 'Response body should contain the created task');

});

tap.test('PUT /api/v1/tasks/:id should update an existing task by ID', async (t) => {
  const taskIdToUpdate = 1;
  const updatedTask = {
    title: 'Updated Task',
    description: 'This task has been updated',
    completed: true,
    priority: 'high',
  };

  const response = await request
    .put(`/api/v1/tasks/${taskIdToUpdate}`)
    .send(updatedTask);

  t.equal(response.status, 200, 'Should return a 200 status code');
  t.type(response.body, 'object', 'Response body should be an object');
  t.equal(response.body.id, taskIdToUpdate, 'Response body should contain the updated task');
  t.equal(response.body.title, updatedTask.title, 'Response body should reflect the updated title');

  t.end();
});

tap.test('PUT /api/v1/tasks/:id should return 404 for non-existent task ID', async (t) => {
  const nonExistentTaskId = 999;
  const updatedTask = {
    title: 'Updated Task',
    description: 'This task has been updated',
    completed: true,
    priority: 'high',
  };

  const response = await request
    .put(`/api/v1/tasks/${nonExistentTaskId}`)
    .send(updatedTask);

  t.equal(response.status, 404, 'Should return a 404 status code');
  t.equal(response.body.message, 'Task not found', 'Response body should contain an error message');

  t.end();
});

tap.test('DELETE /api/v1/tasks/:id should delete a task by ID', async (t) => {
  const taskIdToDelete = 1;
  const response = await request.delete(`/api/v1/tasks/${taskIdToDelete}`);

  t.equal(response.status, 200, 'Should return a 200 status code');
  t.equal(response.body.message, 'Task deleted successfully', 'Response body should contain a success message');

  t.end();
});

tap.test('DELETE /api/v1/tasks/:id should return 404 for non-existent task ID', async (t) => {
  const nonExistentTaskId = 999;
  const response = await request.delete(`/api/v1/tasks/${nonExistentTaskId}`);

  t.equal(response.status, 404, 'Should return a 404 status code');
  t.equal(response.body.message, 'Task not found', 'Response body should contain an error message');

  t.end();
});

tap.test('GET /api/v1/tasks/priority/:level should retrieve tasks based on priority level', async (t) => {
  const priorityLevel = 'high';
  const response = await request.get(`/api/v1/tasks/priority/${priorityLevel}`);

  t.equal(response.status, 200, 'Should return a 200 status code');
  t.type(response.body, 'array', 'Response body should be an array');
  t.ok(response.body.length > 0, 'Response body should contain tasks with the specified priority level');

  t.ok(response.body.every((task: { priority: string; }) => task.priority === priorityLevel), 'All tasks should have the specified priority level');

  t.end();
});

tap.test('GET /api/v1/tasks/priority/:level should return 400 for non-existent priority level', async (t) => {
  const nonExistentPriorityLevel = 'nonexistent';
  const response = await request.get(`/api/v1/tasks/priority/${nonExistentPriorityLevel}`);

  t.equal(response.status, 400, 'Should return a 400 status code');
  t.ok(
    response.body.errors.some((error: any) => error.msg.includes('Priority level should be low, medium, or high')),
    'Response body should contain an error message'
  );

  t.end();
});

tap.test('POST /api/v1/tasks should return 400 for missing required fields', async (t) => {
  const invalidTask = {};

  const response = await request
    .post('/api/v1/tasks')
    .send(invalidTask);

  t.equal(response.status, 400, 'Should return a 400 status code');
  t.type(response.body.errors, 'array', 'Response body should contain an array of errors');
  t.ok(response.body.errors.some((error: any) => error.msg.includes('Title is required')), 'Response should contain a "Title is required" error');

  t.end();
});

tap.test('POST /tasks should return 400 for invalid priority', async (t) => {
  const invalidTask = {
    title: 'Test Task',
    description: 'This is a test task',
    completed: false,
    priority: 'invalid_priority',
  };

  const response = await request
    .post('/api/v1/tasks')
    .send(invalidTask);

  t.equal(response.status, 400, 'Should return a 400 status code');
  t.type(response.body.errors, 'array', 'Response body should contain an array of errors');
  t.ok(response.body.errors.some((error: any) => error.msg.includes('priority should be low or medium or high')), 'Response should contain a "Priority is required" error');

  t.end();
});

tap.test('PUT /tasks/:id should update an existing task with valid data', async (t) => {
  const id = 15;
  const updatedTaskData = {
    title: 'Updated Task',
    description: 'This is an updated task',
    completed: true,
    priority: 'high',
  };

  const response = await request
    .put(`/api/v1/tasks/${id}`)
    .send(updatedTaskData);

  t.equal(response.status, 200, 'Should return a 200 status code');
  t.type(response.body, 'object', 'Response body should be an object');
  t.equal(response.body.id, id, 'Response body should contain the correct task ID');
  t.equal(response.body.title, updatedTaskData.title, 'Response body should contain the updated task title');
  t.equal(response.body.description, updatedTaskData.description, 'Response body should contain the updated task description');
  t.equal(response.body.completed, updatedTaskData.completed, 'Response body should contain the updated completion status');
  t.equal(response.body.priority, updatedTaskData.priority, 'Response body should contain the updated priority');

  t.end();
});

tap.test('PUT /tasks/:id should return 404 for non-existent task ID', async (t) => {
  const nonExistentTaskId = 999;
  const updatedTaskData = {
    title: 'Updated Task',
    description: 'This is an updated task',
    completed: true,
    priority: 'high',
  };

  const response = await request
    .put(`/api/v1/tasks/${nonExistentTaskId}`)
    .send(updatedTaskData);

  t.equal(response.status, 404, 'Should return a 404 status code');
  t.equal(response.body.message, 'Task not found', 'Response body should contain an error message');

  t.end();
});

tap.test('PUT /tasks/:id should return 400 for invalid task data', async (t) => {
  // Assuming taskId exists in your tasks array
  const taskId = 1;
  const invalidTaskData = {
    title: '', // Invalid: Empty title
    description: 'This is an updated task',
    completed: 'invalid', // Invalid: Non-boolean value
    priority: 'invalid', // Invalid: Non-enum value
  };

  const response = await request
    .put(`/api/v1/tasks/${taskId}`)
    .send(invalidTaskData);

  t.equal(response.status, 400, 'Should return a 400 status code');
  t.type(response.body.errors, 'array', 'Response body should contain an array of errors');
  t.ok(response.body.errors.length > 0, 'Response body should contain validation errors');

  t.end();
});
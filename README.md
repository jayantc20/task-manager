# Node.js Task Manager API (First Typescript Project)

This project implements a RESTful API for managing tasks, powered by Node.js, Express.js with TypeScript. It empowers users to create, read, update, and delete tasks with features like filtering, sorting, and assigning priority levels.

## Key Features

* **CRUD Operations:** Seamlessly create, read, update, and delete tasks as needed.
* **Input Validation:** Ensure data integrity with comprehensive validation on task creation and updates.
    * Title and description cannot be empty.
    * Completion status must be a valid boolean value (true/false).
    * Priority level (optional) must be one of "low", "medium", or "high".
* **Filtering:** Efficiently find specific tasks based on completion status using `/tasks?completed=:status` (where status is `true` or `false`).
* **Sorting:** Effortlessly organize tasks by their creation date in ascending order using `/tasks?sortby=createdAt`.
* **Clear Prioritization:** Assign and retrieve tasks based on defined priority levels (low, medium, high) through `/tasks/priority/:level`.
* **Testing:** Use Postman or similar tools to send requests and verify correct operation across all API endpoints.

## Getting Started

**Prerequisites:**

- Node.js version 14 or later
- npm or yarn package manager

**Instructions:**

1. Clone the repository: `git clone [https://github.com/jayantc20/task-manager.git]([https://github.com/your-username/task-manager-api.git](https://github.com/jayantc20/task-manager.git))`
2. Install dependencies: `npm install` (or `yarn install`)
4. Start the server: `npm run dev`
5. Test the API using Postman or a similar tool or npm run test

## API Endpoints

| Endpoint              | Method | Description                                              |
|-----------------------|--------|----------------------------------------------------------|
| `/tasks`             | GET    | Retrieves all tasks stored in the database.                |
| `/tasks/:id`          | GET    | Fetches a specific task by its unique identifier (ID).      |
| `/tasks`             | POST   | Creates a new task with provided title, description, and priority level. |
| `/tasks/:id`          | PUT    | Updates an existing task based on its ID with new data.    |
| `/tasks/:id`          | DELETE | Removes a specific task from the database permanently.     |
| `/tasks?completed=:status` | GET    | Filters tasks based on their completion status (`true` or `false`). |
| `/tasks?sortby=createdAt` | GET    | Sorts tasks in ascending order by their creation date.      |
| `/tasks/priority/:level` | GET    | Retrieves tasks assigned with a specific priority level (low, medium, high). |

## Example Usage

// Get all tasks:
curl http://localhost:3000/api/v1/tasks

// Create a new task:
curl -X POST http://localhost:3000/api/v1/tasks -H "Content-Type: application/json" -d '{ "title": "Set up environment"", "description": "Install Node.js, npm, and git", "completed": false, "priority": "low" }'

// Update a task:
curl -X PUT http://localhost:3000/api/v1/tasks/1 -H "Content-Type: application/json" -d '{ "title": "Set up environment"", "description": "Install Node.js, npm, and git", "completed": true, "priority": "low" }'

// Get tasks by priority:
curl http://localhost:3000/api/v1/tasks/priority/high

## Postman Collection

You can import and test the APIs using the [Postman Collection](https://github.com/jayantc20/task-manager/blob/main/Task-Manager.postman_collection.json).

### Importing the Collection in Postman

1. [Download the Postman Collection File](https://github.com/jayantc20/task-manager/blob/main/Task-Manager.postman_collection.json).
2. Open Postman.
3. Click on "Import" at the top-left corner.
4. Choose the downloaded collection file.
5. The collection should now be available in your Postman workspace.

## Contributing

## License

## Additional Notes

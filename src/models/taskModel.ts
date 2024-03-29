export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    priority: string; 
    createdAt: Date 
  }
  
  export const tasks: Task[] = [
      {
          id: 1,
          title: "Set up environment",
          description: "Install Node.js, npm, and git",
          completed: true,
          priority: "low", 
          createdAt: new Date("2024-01-29T17:52:44.171Z"), 
      },
      {
          id: 2,
          title: "Create a new project",
          description: "Create a new project using the Express application generator",
          completed: true,
          priority: 'medium', 
          createdAt: new Date("2024-01-27T17:52:44.171Z"), 
      },
      {
          id: 3,
          title: "Install nodemon",
          description: "Install nodemon as a development dependency",
          completed: true,
          priority: "high", 
          createdAt: new Date("2024-01-26T17:52:44.171Z"), 
      },
      {
          id: 4,
          title: "Install Express",
          description: "Install Express",
          completed: false,
          priority: "high", 
          createdAt: new Date("2024-01-25T17:52:44.171Z"), 
      },
      {
          id: 5,
          title: "Install Mongoose",
          description: "Install Mongoose",
          completed: false,
          priority: "high", 
          createdAt: new Date("2024-01-24T17:52:44.171Z"), 
      },
      {
          id: 6,
          title: "Install Morgan",
          description: "Install Morgan",
          completed: false,
          priority: "high", 
          createdAt: new Date("2024-01-23T17:52:44.171Z"), 
      },
      {
          id: 7,
          title: "Install body-parser",
          description: "Install body-parser",
          completed: false,
          priority: "high", 
          createdAt: new Date("2024-01-22T17:52:44.171Z"), 
      },
      {
          id: 8,
          title: "Install cors",
          description: "Install cors",
          completed: false,
          priority: "low", 
          createdAt: new Date("2024-01-19T17:52:44.171Z"), 
      },
      {
          id: 9,
          title: "Install passport",
          description: "Install passport",
          completed: false,
          priority: "low", 
          createdAt: new Date("2024-01-18T17:52:44.171Z"), 
      },
      {
          id: 10,
          title: "Install passport-local",
          description: "Install passport-local",
          completed: false,
          priority: "low", 
          createdAt: new Date("2024-01-17T17:52:44.171Z"), 
      },
      {
          id: 11,
          title: "Install passport-local-mongoose",
          description: "Install passport-local-mongoose",
          completed: false,
          priority: "low", 
          createdAt: new Date("2024-01-20T17:52:44.171Z"), 
      },
      {
          id: 12,
          title: "Install express-session",
          description: "Install express-session",
          completed: false,
          priority: "medium", 
          createdAt: new Date("2024-01-26T17:52:44.171Z"), 
      },
      {
          id: 13,
          title: "Install connect-mongo",
          description: "Install connect-mongo",
          completed: false,
          priority: "medium", 
          createdAt: new Date("2024-01-12T17:52:44.171Z"), 
      },
      {
          id: 14,
          title: "Install dotenv",
          description: "Install dotenv",
          completed: false,
          priority: "medium", 
          createdAt: new Date("2024-02-03T17:54:56.741Z"), 
      },
      {
          id: 15,
          title: "Install jsonwebtoken",
          description: "Install jsonwebtoken",
          completed: false,
          priority: "medium", 
          createdAt: new Date("2024-01-20T17:52:44.171Z"), 
      }
  ];
  
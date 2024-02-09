import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';


// Load environment variables from a .env file
dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

// Enable Helmet for additional security headers
app.use(helmet());

// Use rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Use CORS middleware if needed
// const cors = require('cors');
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/tasks', taskRoutes);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
import express, { Request, Response } from 'express';
import taskRoutes from './routes/taskRoutes';

const app: express.Application = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
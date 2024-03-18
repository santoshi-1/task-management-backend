import { Router, Request, Response } from 'express';
import { TaskController } from './tasks.controller';

export const taskRouter: Router = Router();

taskRouter.get(
  '/tasks',
  async (req: Request, res: Response) => {
    const taskController = new TaskController();
    const allTasks = await taskController.getAll();
    res.json(allTasks).status(200);
  },
);

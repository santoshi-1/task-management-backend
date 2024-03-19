import { Request, Response } from 'express';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // Declare a variable to hold all tasks
    let allTasks: Task[];

    // Fetch all tasks using the repository
    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      res.json(allTasks).status(200);
      return res;
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    //Create a new instance of the Task (Convert plain object to instance)
    const newTask = new Task();

    //Add all the required properties of the task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    //Add the new task to the database
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      //convert instance to plain object
      createdTask = instanceToPlain(createdTask) as Task;
      return res.json(createdTask).status(201);
    } catch (errors) {
      return res.json('Internal Server Error').status(500);
    }
  }

  //Method for updating tasks
  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    //Find the task and check if it exists within the data base
    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: { id: req.body.id },
      });
    } catch (errors) {
      return res.json('Internal Server Error').status(500);
    }
    //Return 400 if task is null
    if (!task) {
      return res.status(404).json({
        error: 'The task with given ID does not exist',
      });
    }
    //Declare a variable for updated task
    let updatedTask: UpdateResult;
    //update the task
    try {
      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );

      //convert the updated instance into an object

      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (errors) {
      return res.status(404).json({
        error: 'The task with given ID does not exist',
      });
    }
  }
}

export const taskController = new TasksController();

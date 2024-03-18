import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../..';
import { Task } from './tasks.entity';

export class TaskController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  public async getAll(): Promise<Task[]> {
    //Declare a variable to hold all tasks
    let allTasks: Task[];

    //Fetch all tasks using the repository

    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });
      //convert the task instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];
      return allTasks;
    } catch (errors) {
      allTasks = [];
      console.log(errors);
    }

    return allTasks;
  }
}

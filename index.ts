import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

//To instantiate express app
const app: Express = express();
dotenv.config();

//parse request body
app.use(bodyParser.json());

//use cors install types
app.use(cors());

//create Database connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});
//Define server port
const port = process.env.PORT;

//create a default route for application
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

AppDataSource.initialize()
  .then(() => {
    //start listening to the requests on the defined portapp
    app.listen(port);
    console.log('Data source initialized');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', tasksRouter);

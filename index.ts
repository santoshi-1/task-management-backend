import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

//To instantiate express app
const app: Express = express();
dotenv.config();

//Define server port
const port = process.env.PORT;

//create a default route for application
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//start listening to the requests on the defined portapp
app.listen(port);
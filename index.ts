import express, { Express, Request, Response } from "express";

//To instantiate express app
const app: Express = express();

//Define server port
const port: number = 3200;

//create a default route for application
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//start listening to the requests on the defined portapp
app.listen(port);

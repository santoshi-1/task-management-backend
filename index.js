const express = require("express");

//To instantiate express app
const app = express();

//Define server port
const port = 3200;

//create a default route for application
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

//start listening to the requests on the defined portapp
app.listen(port);

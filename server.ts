import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello, Express.js Server! </h1>");
});

//route files
const vendorsRoute = require("./routes/vendors");

//use Routes
app.use("/vendor", vendorsRoute);

const port = process.env.PORT || 3000;

//Listener
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

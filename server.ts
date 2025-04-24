import express, { Request, Response } from "express";
import dotenv from "dotenv";
import vendorRoutes from "./routes/vendors";

dotenv.config();
const app = express();

//use Routes
app.use(express.json());
app.use("/vendor", vendorRoutes);

//Listener
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

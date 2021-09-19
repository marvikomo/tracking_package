import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import express from "express";
import router from "./route";

createConnection()
  .then(async (connection) => {
    console.log("Express application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));

// create express app
export const app = express();
app.use(express.json());

app.use(`/api/`, router);

// run app
app.listen(3000);

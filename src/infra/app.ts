import "reflect-metadata";
import express from "express";
import "express-async-errors";

import "../shared/container/repositories";
import { HttpExceptionFunction } from "./error/HttpExceptionFunction";

const application = express();

application.use(express.json());

application.use(HttpExceptionFunction);

export { application };

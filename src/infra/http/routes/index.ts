import { Router } from "express";

import { roleRouter } from "./role";
import { userRouter } from "./user";
import { categoryRouter } from "./category";
import { bookRouter } from "./book";

const routes = Router();

routes.use("/roles", roleRouter);
routes.use("/users", userRouter);
routes.use("/categories", categoryRouter);
routes.use("/books", bookRouter);

export { routes };

import { Router } from "express";

import { roleRouter } from "./role";
import { userRouter } from "./user";
import { categoryRouter } from "./category";

const routes = Router();

routes.use("/roles", roleRouter);
routes.use("/users", userRouter);
routes.use("/categories", categoryRouter);

export { routes };

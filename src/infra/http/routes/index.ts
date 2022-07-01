import { Router } from "express";

import { roleRouter } from "./role";
import { userRouter } from "./user";

const routes = Router();

routes.use("/roles", roleRouter);
routes.use("/users", userRouter);

export { routes };

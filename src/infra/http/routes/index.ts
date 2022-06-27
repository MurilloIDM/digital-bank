import { Router } from "express";

import { roleRouter } from "./role";

const routes = Router();

routes.use("/roles", roleRouter);

export { routes };

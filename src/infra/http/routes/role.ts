import { Router } from "express";
import { body } from "express-validator";

import { CreateRoleController } from "../../../modules/Role/useCases/createRole/CreateRoleController";

const roleRouter = Router();

const createRoleController = new CreateRoleController();

roleRouter.post(
  "/",
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  createRoleController.handle
);

export { roleRouter };

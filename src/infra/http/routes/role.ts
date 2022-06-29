import { Router } from "express";
import { body } from "express-validator";

import { CreateRoleController } from "../../../modules/Role/useCases/createRole/CreateRoleController";
import { ListAllRolesController } from "../../../modules/Role/useCases/listAllRoles/ListAllRolesController";

const roleRouter = Router();

const createRoleController = new CreateRoleController();
const listAllRoleController = new ListAllRolesController();

roleRouter.post(
  "/",
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  createRoleController.handle
);

roleRouter.get(
  "/",
  listAllRoleController.handle
);

export { roleRouter };

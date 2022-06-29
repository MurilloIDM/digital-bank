import { Router } from "express";
import { body } from "express-validator";

import { CreateRoleController } from "../../../modules/Role/useCases/createRole/CreateRoleController";
import { DeleteRoleController } from "../../../modules/Role/useCases/deleteRole/DeleteRoleController";
import { ListAllRolesController } from "../../../modules/Role/useCases/listAllRoles/ListAllRolesController";

const roleRouter = Router();

const createRoleController = new CreateRoleController();
const listAllRoleController = new ListAllRolesController();
const deleteRoleController = new DeleteRoleController();

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

roleRouter.delete(
  "/:id",
  deleteRoleController.handle
);

export { roleRouter };

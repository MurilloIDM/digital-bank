import { Router } from "express";
import { body } from "express-validator";

import { CreateRoleController } from "../../../modules/Role/useCases/createRole/CreateRoleController";
import { DeleteRoleController } from "../../../modules/Role/useCases/deleteRole/DeleteRoleController";
import { ListAllRolesController } from "../../../modules/Role/useCases/listAllRoles/ListAllRolesController";
import { ensureAuthenticationMasterAdmin } from "../middlewares/EnsureAuthenticationMasterAdmin";

const roleRouter = Router();

const createRoleController = new CreateRoleController();
const listAllRoleController = new ListAllRolesController();
const deleteRoleController = new DeleteRoleController();

roleRouter.post(
  "/",
  ensureAuthenticationMasterAdmin,
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  createRoleController.handle
);

roleRouter.get(
  "/",
  ensureAuthenticationMasterAdmin,
  listAllRoleController.handle
);

roleRouter.delete(
  "/:id",
  ensureAuthenticationMasterAdmin,
  deleteRoleController.handle
);

export { roleRouter };

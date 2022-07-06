import { Router } from "express";
import { body } from "express-validator";

import { AuthUserController } from "../../../modules/User/useCases/authUser/AuthUserController";
import { CreateAdminController } from "../../../modules/User/useCases/createAdmin/CreateAdminController";
import { CreateReaderController } from "../../../modules/User/useCases/createReader/CreateReaderController";
import { DeleteUserController } from "../../../modules/User/useCases/deleteUser/DeleteUserController";
import { ListAllUsersController } from "../../../modules/User/useCases/listAllUsers/ListAllUsersController";
import { UpdateAdminController } from "../../../modules/User/useCases/updateAdmin/UpdateAdminController";
import { UpdateReaderController } from "../../../modules/User/useCases/updateReader/UpdateReaderController";

import { ensureAuthenticationReader } from "../middlewares/EnsureAuthenticationReader";
import { ensureAuthenticationMasterAdmin } from "../middlewares/EnsureAuthenticationMasterAdmin";

const userRouter = Router();

const createAdminController = new CreateAdminController();
const createReaderController = new CreateReaderController();
const listAllUsersController = new ListAllUsersController();
const deleteUserController = new DeleteUserController();
const updateReaderController = new UpdateReaderController();
const updateAdmiController = new UpdateAdminController();
const authUserController = new AuthUserController();

userRouter.post(
  "/auth",
  body('email').isEmail().notEmpty().withMessage("email is string and cannot be empty."),
  body('password').isString().notEmpty().withMessage("password is string and cannot be empty."),
  authUserController.handle
);


userRouter.post(
  "/admin/",
  ensureAuthenticationMasterAdmin,
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('email').isEmail().notEmpty().withMessage("email is string and cannot be empty."),
  body('password').isString().notEmpty().withMessage("password is string and cannot be empty."),
  body('rolesId').isArray({ min: 1 }).withMessage("rolesId is role list and cannot be empty."),
  createAdminController.handle
);

userRouter.post(
  "/reader/",
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('email').isEmail().notEmpty().withMessage("email is string and cannot be empty."),
  body('password').isString().notEmpty().withMessage("password is string and cannot be empty."),
  createReaderController.handle,
);

userRouter.put(
  "/reader/:id",
  ensureAuthenticationReader,
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('email').isEmail().notEmpty().withMessage("email is string and cannot be empty."),
  body('password').isString().notEmpty().withMessage("password is string and cannot be empty."),
  updateReaderController.handle
);

userRouter.put(
  "/admin/:id",
  ensureAuthenticationMasterAdmin,
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('email').isEmail().notEmpty().withMessage("email is string and cannot be empty."),
  body('password').isString().notEmpty().withMessage("password is string and cannot be empty."),
  body('rolesId').isArray({ min: 1 }).withMessage("rolesId is role list and cannot be empty."),
  updateAdmiController.handle
)

userRouter.get(
  "/",
  ensureAuthenticationMasterAdmin,
  listAllUsersController.handle
);

userRouter.delete(
  "/:id",
  ensureAuthenticationMasterAdmin,
  deleteUserController.handle
)

export { userRouter };

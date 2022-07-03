import { Router } from "express";
import { body } from "express-validator";
import { CreateAdminController } from "../../../modules/User/useCases/createAdmin/CreateAdminController";
import { CreateReaderController } from "../../../modules/User/useCases/createReader/CreateReaderController";
import { DeleteUserController } from "../../../modules/User/useCases/deleteUser/DeleteUserController";
import { ListAllUsersController } from "../../../modules/User/useCases/listAllUsers/ListAllUsersController";

const userRouter = Router();

const createAdminController = new CreateAdminController();
const createReaderController = new CreateReaderController();
const listAllUsersController = new ListAllUsersController();
const deleteUserController = new DeleteUserController();

userRouter.post(
  "/admin/",
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

userRouter.get(
  "/",
  listAllUsersController.handle
);

userRouter.delete(
  "/:id",
  deleteUserController.handle
)

export { userRouter };

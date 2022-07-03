import { Router } from "express";
import { body } from "express-validator";
import { CreateUserController } from "../../../modules/User/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "../../../modules/User/useCases/listAllUsers/ListAllUsersController";

const userRouter = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();

userRouter.post(
  "/",
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('email').isEmail().notEmpty().withMessage("email is string and cannot be empty."),
  body('password').isString().notEmpty().withMessage("password is string and cannot be empty."),
  body('rolesId').isArray({ min: 1 }).withMessage("rolesId is role list and cannot be empty."),
  createUserController.handle
);

userRouter.get(
  "/",
  listAllUsersController.handle
);

export { userRouter };

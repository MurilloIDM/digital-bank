import { Router } from "express";
import { body } from "express-validator";
import { CreateUserController } from "../../../modules/User/useCases/createUser/CreateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post(
  "/",
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('email').isEmail().notEmpty().withMessage("email is string and cannot be empty."),
  body('password').isString().notEmpty().withMessage("password is string and cannot be empty."),
  body('rolesId').isArray({ min: 1 }).withMessage("rolesId is role list and cannot be empty."),
  createUserController.handle
);

export { userRouter };

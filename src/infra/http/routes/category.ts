import { Router } from "express";
import { body } from "express-validator";
import { CreateCategoryController } from "../../../modules/Book/useCases/createCategory/CreateCategoryController";

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController();

categoryRouter.post(
  "/",
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('description').isString().notEmpty().withMessage("description is string and connot be empty."),
  createCategoryController.handle
);

export { categoryRouter };
import { Router } from "express";
import { body } from "express-validator";
import { CreateCategoryController } from "../../../modules/Book/useCases/createCategory/CreateCategoryController";
import { ListAllCategoryController } from "../../../modules/Book/useCases/listAllCategory/ListAllCategoryController";
import { UpdateCategoryController } from "../../../modules/Book/useCases/updateCategory/UpdateCategoryController";

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const listAllCategoryController = new ListAllCategoryController();

categoryRouter.post(
  "/",
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('description').isString().notEmpty().withMessage("description is string and connot be empty."),
  createCategoryController.handle
);

categoryRouter.put(
  "/:id",
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('description').isString().notEmpty().withMessage("description is string and connot be empty."),
  updateCategoryController.handle
);

categoryRouter.get(
  "/",
  listAllCategoryController.handle
);

export { categoryRouter };
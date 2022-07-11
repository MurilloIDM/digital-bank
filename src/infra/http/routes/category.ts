import { Router } from "express";
import { body } from "express-validator";
import { CreateCategoryController } from "../../../modules/Book/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "../../../modules/Book/useCases/deleteCategory/DeleteCategoryController";
import { ListAllCategoryController } from "../../../modules/Book/useCases/listAllCategory/ListAllCategoryController";
import { UpdateCategoryController } from "../../../modules/Book/useCases/updateCategory/UpdateCategoryController";
import { ensureAuthenticationAdmin } from "../middlewares/EnsureAuthenticationAdmin";

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const listAllCategoryController = new ListAllCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoryRouter.post(
  "/",
  ensureAuthenticationAdmin,
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('description').isString().notEmpty().withMessage("description is string and connot be empty."),
  createCategoryController.handle
);

categoryRouter.put(
  "/:id",
  ensureAuthenticationAdmin,
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('description').isString().notEmpty().withMessage("description is string and connot be empty."),
  updateCategoryController.handle
);

categoryRouter.get(
  "/",
  ensureAuthenticationAdmin,
  listAllCategoryController.handle
);

categoryRouter.delete(
  "/:id",
  ensureAuthenticationAdmin,
  deleteCategoryController.handle
);

export { categoryRouter };
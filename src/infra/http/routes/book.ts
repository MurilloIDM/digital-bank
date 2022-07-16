import { Router } from "express";
import { body } from "express-validator";
import { CreateBookController } from "../../../modules/Book/useCases/createBook/CreateBookController";
import { ensureAuthenticationReader } from "../middlewares/EnsureAuthenticationReader";

const bookRouter = Router();

const createBookController = new CreateBookController();

bookRouter.post(
  "/",
  ensureAuthenticationReader,
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('author').isString().notEmpty().withMessage("author is string and cannot be empty."),
  body('cover_url').isURL().notEmpty().withMessage("cover_url is url and cannot be empty."),
  body('number_of_pages').isInt().notEmpty().withMessage("number_of_pages is numeric and cannot be empty."),
  body('categories').isArray({ min: 1 }).withMessage("categories is list and cannot be empty."),
  createBookController.handle
);

export { bookRouter };
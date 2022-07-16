import { Router } from "express";
import { body, query } from "express-validator";
import { CreateBookController } from "../../../modules/Book/useCases/createBook/CreateBookController";
import { ListAllBookController } from "../../../modules/Book/useCases/ListAllBook/ListAllBookController";
import { UpdateBookController } from "../../../modules/Book/useCases/updateBook/UpdateBookController";
import { ensureAuthenticationReader } from "../middlewares/EnsureAuthenticationReader";

const bookRouter = Router();

const createBookController = new CreateBookController();
const updateBookController = new UpdateBookController();
const listAllBookController = new ListAllBookController();

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

bookRouter.put(
  "/:id",
  ensureAuthenticationReader,
  body('name').isString().notEmpty().withMessage("name is string and cannot be empty."),
  body('author').isString().notEmpty().withMessage("author is string and cannot be empty."),
  body('cover_url').isURL().notEmpty().withMessage("cover_url is url and cannot be empty."),
  body('number_of_pages').isInt().notEmpty().withMessage("number_of_pages is numeric and cannot be empty."),
  body('categories').isArray({ min: 1 }).withMessage("categories is list and cannot be empty."),
  updateBookController.handle
);

bookRouter.get(
  "/",
  ensureAuthenticationReader,
  query('name').default(''),
  query('page').default(1).notEmpty().withMessage("page cannot be empty."),
  query('number_per_page').default(10).notEmpty().withMessage("number_per_page cannot be empty."),
  listAllBookController.handle
);

export { bookRouter };
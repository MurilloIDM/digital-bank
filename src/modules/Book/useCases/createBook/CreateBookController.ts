import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { CreateBookUseCase } from "./CreateBookUseCase";

export class CreateBookController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const userId = request.user.id;
    const { name, author, cover_url, categories, number_of_pages } = request.body;

    const createBookUseCase = container.resolve(CreateBookUseCase);

    await createBookUseCase.execute({ name, author, cover_url, categories, number_of_pages, userId });

    return response.status(201).send();
  }

}
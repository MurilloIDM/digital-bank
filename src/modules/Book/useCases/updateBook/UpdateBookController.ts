import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { UpdateBookUseCase } from "./UpdateBookUseCase";

export class UpdateBookController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;
    const userId = request.user.id;
    const { name, author, cover_url, categories, number_of_pages } = request.body;

    const updateBookUseCase = container.resolve(UpdateBookUseCase);
    
    await updateBookUseCase.execute({ id, name, author, cover_url, categories, number_of_pages, userId });

    return response.send();
  }

}
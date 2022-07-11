import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }

}
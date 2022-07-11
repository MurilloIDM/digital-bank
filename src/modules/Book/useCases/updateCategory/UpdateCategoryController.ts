import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

export class UpdateCategoryController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;
    const { name, description } = request.body;

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

    await updateCategoryUseCase.execute({ id, name, description });

    return response.send();
  }

}
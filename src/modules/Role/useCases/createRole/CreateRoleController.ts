import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { CreateRoleUseCase } from "./CreateRoleUseCase";

export class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { name, description } = request.body;

    const createRoleUseCase = container.resolve(CreateRoleUseCase);

    await createRoleUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
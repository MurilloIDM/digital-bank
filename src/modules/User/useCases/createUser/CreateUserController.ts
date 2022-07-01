import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }

    const { name, email, password, rolesId } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, password, email, rolesId });

    return response.status(201).send();
  }

}
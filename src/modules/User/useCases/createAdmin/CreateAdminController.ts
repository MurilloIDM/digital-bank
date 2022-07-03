import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

export class CreateAdminController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }

    const { name, email, password, rolesId } = request.body;

    const createAdminUseCase = container.resolve(CreateAdminUseCase);

    await createAdminUseCase.execute({ name, password, email, rolesId });

    return response.status(201).send();
  }

}
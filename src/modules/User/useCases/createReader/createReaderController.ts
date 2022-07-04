import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { CreateReaderUseCase } from "./CreateReaderUseCase";

export class CreateReaderController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { name, password, email } = request.body;

    const createReaderUseCase = container.resolve(CreateReaderUseCase);

    await createReaderUseCase.execute({ name, password, email });

    return response.status(201).send();
  }

}
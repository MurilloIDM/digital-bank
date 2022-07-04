import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { UpdateReaderUseCase } from "./UpdateReaderUseCase";

export class UpdateReaderController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;
    const { name, password, email } = request.body;

    const updateReaderUseCase = container.resolve(UpdateReaderUseCase);

    await updateReaderUseCase.execute({ name, password, email }, id);

    return response.send();
  }

}
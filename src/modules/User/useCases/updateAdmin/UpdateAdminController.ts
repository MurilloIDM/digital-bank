import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { UpdateAdminUseCase } from "./UpdateAdminUseCase";

export class UpdateAdminController {

  async handle(request: Request, response: Response): Promise<Response<void>> {
    const errors = validationResult(request);

    if (!errors?.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { id } = request.params;
    const { name, email, password, rolesId } = request.body;

    const updateAdminUseCase = container.resolve(UpdateAdminUseCase);

    await updateAdminUseCase.execute({ name, email, password, rolesId }, id);

    return response.send();
  }

}
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(id);

    return response.status(204).send();
  }

}
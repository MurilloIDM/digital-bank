import { Request, Response } from "express";
import { container } from "tsyringe";
import { IUser } from "../../dto/IUser";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

export class ListAllUsersController {

  async handle(_request: Request, response: Response): Promise<Response<IUser[]>> {
    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

    const users = await listAllUsersUseCase.execute();

    if (!users.length) {
      return response.status(204).send();
    }

    return response.json(users);
  }

}
import { Request, Response } from "express";
import { container } from "tsyringe";
import { Role } from "@prisma/client";

import { ListAllRolesUseCase } from "./ListAllRolesUseCase";

export class ListAllRolesController {

  async handle(_request: Request, response: Response): Promise<Response<Role[]>> {
    const listAllRolesUseCase = container.resolve(ListAllRolesUseCase);

    const roles = await listAllRolesUseCase.execute();

    if (!roles.length) {
      return response.status(204).send();
    }

    return response.json(roles);
  }
}

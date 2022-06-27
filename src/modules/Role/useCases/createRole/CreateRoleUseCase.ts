import { inject, injectable } from "tsyringe";

import { HttpException } from "../../../../infra/error/HttpException";
import { ICreateRole } from "../../dto/ICreateRole";
import { RoleRepository } from "../../infra/prisma/repositories/RoleRepository";

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject("RoleRepository")
    private roleRepository: RoleRepository
  ) {}

  async execute({ name, description }: ICreateRole): Promise<void> {
    const roleAlreadyExists = await this.roleRepository.findByName(name);

    if (roleAlreadyExists) {
      throw new HttpException("Role already exists with this name!", 400);
    }

    const nameUppercase = name.toUpperCase();

    await this.roleRepository.create({ name: nameUppercase, description });
  }
}
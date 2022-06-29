import { inject, injectable } from "tsyringe";
import { Role } from "@prisma/client";

import { IRoleRepository } from "../../repositories/IRoleRepository";

@injectable()
export class ListAllRolesUseCase {
  constructor(
    @inject("RoleRepository")
    private roleRepository: IRoleRepository
  ) {}

  async execute(): Promise<Role[]> {
    const roles = await this.roleRepository.listAll();
    return roles;
  }
}
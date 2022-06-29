import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { IRoleRepository } from "../../repositories/IRoleRepository";

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject("RoleRepository")
    private roleRepository: IRoleRepository
  ) {}

  async execute(id: string): Promise<void> {
    const roleAlreadyExists = await this.roleRepository.findById(id);

    if (!roleAlreadyExists) {
      throw new HttpException("Role not exists.", 400);
    }

    await this.roleRepository.delete(id);
  }
  
}

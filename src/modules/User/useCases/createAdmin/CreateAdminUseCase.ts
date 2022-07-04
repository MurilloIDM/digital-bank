import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { IRoleRepository } from "../../../Role/repositories/IRoleRepository";
import { ICreateOrUpdateUser } from "../../dto/ICreateOrUpdateUser";

import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CreateAdminUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("RoleRepository")
    private roleRepository: IRoleRepository,
  ) {}

  async execute({ name, password, email, rolesId }: ICreateOrUpdateUser): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException("User already exists with this email.", 400);
    }

    for (const role of rolesId) {
      const roleExists = await this.roleRepository.findById(role?.id);

      if (!roleExists) {
        throw new HttpException(`Unable to register user. The role of id (${role?.id}) does not exist.`, 400);
      }
    }

    const passwordHash = await hash(password, 10);


    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      rolesId,
    });
  }

}

import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { IRoleRepository } from "../../../Role/repositories/IRoleRepository";
import { ICreateOrUpdateUser } from "../../dto/ICreateOrUpdateUser";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CreateReaderUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("RoleRepository")
    private roleRepository: IRoleRepository
  ) {}

  async execute({ name, email, password }: ICreateOrUpdateUser): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException("User already exists with this email.", 400);
    }

    const roleReader = await this.roleRepository.findByName("READER");
    const rolesId = [{ id: roleReader?.id }];

    const passwordHash = await hash(password, 10);

    await this.userRepository.create({
      name,
      email,
      rolesId,
      password: passwordHash,
    });
  }

}
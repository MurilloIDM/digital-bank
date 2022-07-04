import { inject, injectable } from "tsyringe";
import _differenceWith from "lodash.differencewith";
import { HttpException } from "../../../../infra/error/HttpException";
import { ICreateOrUpdateUser } from "../../dto/ICreateOrUpdateUser";
import { IUserRepository } from "../../repositories/IUserRepository";
import { compare, hash } from "bcrypt";

@injectable()
export class UpdateAdminUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, password, email, rolesId }: ICreateOrUpdateUser, id: string): Promise<void> {
    const userAlreadyExistsWithId = await this.userRepository.findById(id);

    if (!userAlreadyExistsWithId) {
      throw new HttpException("User not exists.", 400);
    }

    const userAlreadyExistsWithEmail = await this.userRepository.findByEmail(email);

    if (userAlreadyExistsWithEmail && userAlreadyExistsWithEmail?.id !== id) {
      throw new HttpException("User already exists with this email.", 400);
    }

    const connectRolesId = _differenceWith(rolesId, userAlreadyExistsWithId?.roles, (a, b) => a.id === b.id);
    const disconnectRolesId = _differenceWith(userAlreadyExistsWithId?.roles, rolesId, (a, b) => a.id === b.id);

    let passwordUpdated = userAlreadyExistsWithId?.password;
    const passwordEquals = await compare(password, passwordUpdated);

    if (!passwordEquals) {
      passwordUpdated = await hash(password, 10);
    }

    await this.userRepository.update({
      name,
      email,
      password: passwordUpdated,
      rolesId: connectRolesId,
      rolesDisconnect: disconnectRolesId
    }, id);
  }
}
import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { ICreateOrUpdateUser } from "../../dto/ICreateOrUpdateUser";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class UpdateReaderUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: ICreateOrUpdateUser, id: string): Promise<void> {
    const userAlreadyExistsWithId = await this.userRepository.findById(id);

    if (!userAlreadyExistsWithId) {
      throw new HttpException("User not exists.", 400);
    }

    const userAlreadyExistsWithEmail = await this.userRepository.findByEmail(email);

    if (userAlreadyExistsWithEmail && userAlreadyExistsWithEmail?.id !== id) {
      throw new HttpException("User already exists with this email.", 400);
    }

    let passwordUpdated = userAlreadyExistsWithId?.password;
    const passwordEquals = await compare(password, passwordUpdated);

    if (!passwordEquals) {
      passwordUpdated = await hash(password, 10);
    }

    await this.userRepository.update({
      name,
      email,
      password: passwordUpdated,
      rolesId: [],
      rolesDisconnect: [],
    }, id);
  }

}
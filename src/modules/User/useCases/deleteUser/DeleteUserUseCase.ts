import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<void> {
    const userAlreadyExists = await this.userRepository.findById(id);

    if (!userAlreadyExists) {
      throw new HttpException("User not exists.", 400);
    }

    await this.userRepository.delete(id);
  }

}
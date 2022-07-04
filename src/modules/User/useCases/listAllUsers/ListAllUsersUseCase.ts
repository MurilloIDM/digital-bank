import { inject, injectable } from "tsyringe";
import { IUser } from "../../dto/IUser";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class ListAllUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<IUser[]> {
    const users = await this.userRepository.listAll();

    return users;
  }

}
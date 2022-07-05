import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { IAuthUser } from "../../dto/IAuthUser";
import { IToken } from "../../dto/IToken";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class AuthUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IAuthUser): Promise<IToken> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException("Invalid email or password.", 400);
    }

    const comparePassword = await compare(password, user?.password);

    if (!comparePassword) {
      throw new HttpException("Invalid email or password.", 400);
    }

    const token = sign({ email }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "90m",
      subject: user?.id,
    });

    return {
      token
    } as IToken;

  }

}
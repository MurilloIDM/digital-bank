import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { IAuthUser } from "../../dto/IAuthUser";
import { AuthUserUseCase } from "./AuthUserUseCase";

export class AuthUserController {

  async handle(request: Request, response: Response): Promise<Response<IAuthUser>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    const authUserUseCase = container.resolve(AuthUserUseCase);

    const token = await authUserUseCase.execute({ email, password });

    return response.json(token);
  }

}
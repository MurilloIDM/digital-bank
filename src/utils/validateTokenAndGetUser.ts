import { Request } from "express";
import { verify } from "jsonwebtoken";
import { HttpException } from "../infra/error/HttpException";
import { IUserRole } from "../modules/User/dto/IUserRole";
import { UserRepository } from "../modules/User/infra/prisma/repositories/UserRepository";

export async function validateTokenAndGetUser(request: Request): Promise<IUserRole> {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new HttpException("Invalid token.", 401);
  }

  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer") {
    throw new HttpException("Invalid token prefix.", 401);
  }

  let userId = null;
  try {
    const { sub } = verify(token, process.env.SECRET) as { sub: string };
    userId = sub;

  } catch (err) {
    throw new HttpException("Invalid token.", 401);
  }

  const userRepository = new UserRepository();
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new HttpException("Invalid token.", 401);
  }

  return user;
}
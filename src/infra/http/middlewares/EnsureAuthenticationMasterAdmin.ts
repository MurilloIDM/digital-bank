import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { RoleRepository } from "../../../modules/Role/infra/prisma/repositories/RoleRepository";
import { UserRepository } from "../../../modules/User/infra/prisma/repositories/UserRepository";
import { HttpException } from "../../error/HttpException";

export async function ensureAuthenticationMasterAdmin(request: Request, _response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new HttpException("Invalid token.", 401);
  }

  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer") {
    throw new HttpException("Invalid prefix.", 401);
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

  const roleRepository = new RoleRepository();
  const roleMasterAdmin = await roleRepository.findByName("ADMIN MASTER");

  const includeRole = user?.roles.some((role) => role?.id === roleMasterAdmin?.id);
  
  if (!includeRole) {
    throw new HttpException("Invalid access role.", 401);
  }

  request.user = {
    id: user?.id,
    email: user?.email,
  }

  next();

}

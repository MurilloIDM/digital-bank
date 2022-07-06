import { NextFunction, Request, Response } from "express";

import { HttpException } from "../../error/HttpException";
import { validateTokenAndGetUser } from "../../../utils/validateTokenAndGetUser";
import { RoleRepository } from "../../../modules/Role/infra/prisma/repositories/RoleRepository";

export async function ensureAuthenticationReader(request: Request, _response: Response, next: NextFunction) {
  const user = await validateTokenAndGetUser(request);

  const roleRepository = new RoleRepository();
  const roleReader = await roleRepository.findByName("READER");

  const includeRole = user?.roles.some((role) => role?.id === roleReader?.id);

  if (!includeRole) {
    throw new HttpException("Invalid access role.", 401);
  }

  request.user = {
    id: user?.id,
    email: user?.email,
  };

  next();
}
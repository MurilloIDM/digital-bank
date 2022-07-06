import { NextFunction, Request, Response } from "express";

import { HttpException } from "../../error/HttpException";
import { validateTokenAndGetUser } from "../../../utils/validateTokenAndGetUser";
import { RoleRepository } from "../../../modules/Role/infra/prisma/repositories/RoleRepository";

export async function ensureAuthenticationAdmin(request: Request, _response: Response, next: NextFunction) {
  const user = await validateTokenAndGetUser(request);

  const roleRepository = new RoleRepository();
  const roleAdmin = await roleRepository.findByName("ADMIN");
  const roleMasterAdmin = await roleRepository.findByName("ADMIN MASTER");

  const includeRole = user?.roles.some((role) => (role?.id === roleAdmin?.id) || (role?.id === roleMasterAdmin?.id));

  if (!includeRole) {
    throw new HttpException("Invalid access role.", 401);
  }

  request.user = {
    id: user?.id,
    email: user?.email,
  }

  next();
}
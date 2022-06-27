import { RoleRepository } from "../../modules/Role/infra/prisma/repositories/RoleRepository";
import { IRoleRepository } from "../../modules/Role/repositories/IRoleRepository";
import { container } from "tsyringe";

container.registerSingleton<IRoleRepository>(
  "RoleRepository",
  RoleRepository
);
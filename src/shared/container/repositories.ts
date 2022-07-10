import { container } from "tsyringe";

import { RoleRepository } from "../../modules/Role/infra/prisma/repositories/RoleRepository";
import { IRoleRepository } from "../../modules/Role/repositories/IRoleRepository";
import { IUserRepository } from "../../modules/User/repositories/IUserRepository";
import { UserRepository } from "../../modules/User/infra/prisma/repositories/UserRepository";
import { ICategoryRepository } from "../../modules/Book/repository/ICategoryRepository";
import { CategoryRepository } from "../../modules/Book/infra/prisma/repositories/CategoryRepository";

container.registerSingleton<IRoleRepository>(
  "RoleRepository",
  RoleRepository
);

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
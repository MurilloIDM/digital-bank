import { Role } from "@prisma/client";
import { ICreateRole } from "../dto/ICreateRole";

export interface IRoleRepository {
  create(payload: ICreateRole): Promise<void>;
  listAll(): Promise<Role[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Role>;
  findByName(name: string): Promise<Role>;
}

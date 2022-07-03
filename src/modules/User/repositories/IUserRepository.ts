import { User } from "@prisma/client";
import { IUser } from "../dto/IUser";
import { ICreateOrUpdateUser } from "../dto/ICreateOrUpdateUser";

export interface IUserRepository {
  create(payload: ICreateOrUpdateUser): Promise<void>;
  update(payload: ICreateOrUpdateUser, id: string): Promise<void>;
  listAll(): Promise<IUser[]>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
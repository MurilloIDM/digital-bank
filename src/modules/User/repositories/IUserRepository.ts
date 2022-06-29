import { ICreateOrUpdateUser } from "../dto/ICreateOrUpdateUser";
import { IUser } from "../dto/IUser";

export interface IUserRepository {
  create(payload: ICreateOrUpdateUser): Promise<void>;
  update(payload: ICreateOrUpdateUser, id: string): Promise<void>;
  listAll(): Promise<IUser[]>;
  delete(id: string): Promise<void>;
}
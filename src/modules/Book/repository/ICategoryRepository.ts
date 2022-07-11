import { Category } from "@prisma/client";
import { ICreateOrUpdateCategory } from "../dto/ICreateOrUpdateCategory";

export interface ICategoryRepository {
  create(payload: ICreateOrUpdateCategory): Promise<void>;
  update(payload: ICreateOrUpdateCategory, id: string): Promise<void>;
  listAll(): Promise<Category[]>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Category>;
  findById(id: string): Promise<Category>;
}
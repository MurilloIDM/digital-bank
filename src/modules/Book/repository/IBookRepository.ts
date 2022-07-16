import { Book } from "@prisma/client";
import { IBook } from "../dto/IBook";
import { ICreateOrUpdateBook } from "../dto/ICreateOrUpdateBook";
import { IListAllBook } from "../dto/IListAllBook";
import { IPaginationBooks } from "../dto/IPaginationBooks";

export interface IBookRepository {
  create(payload: ICreateOrUpdateBook): Promise<void>;
  update(payload: ICreateOrUpdateBook): Promise<void>;
  listAll(query: IListAllBook): Promise<IPaginationBooks>;
  delete(id: string): Promise<void>;
  findByNameAndAuthorAndUser(name: string, author: string, userId: string): Promise<IBook>;
  findById(id: string): Promise<Book>;
}
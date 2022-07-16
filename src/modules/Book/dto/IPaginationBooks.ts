import { Category } from "@prisma/client";

export interface IPaginationBooks {
  books: IBook[];
  actualPage?: number;
  isNextPage?: boolean;
  totalElements?: number;
}

interface IBook {
  id: string;
  name: string;
  number_of_pages: number;
  author: string;
  cover_url: string;
  categories: Category[];
}
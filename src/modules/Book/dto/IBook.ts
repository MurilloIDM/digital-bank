export interface IBook {
  id: string;
  name: string;
  userId: string;
  author: string;
  cover_url: string;
  number_of_pages: number;
  categories: ICategory[];
}

interface ICategory {
  id: string;
}
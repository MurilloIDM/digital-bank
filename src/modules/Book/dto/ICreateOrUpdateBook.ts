export interface ICreateOrUpdateBook {
  id?: string;
  name: string;
  number_of_pages: number;
  author: string;
  cover_url: string;
  userId?: string;
  categories?: ICategory[];
  disconnectCategories: ICategory[];
}

interface ICategory {
  id: string;
}
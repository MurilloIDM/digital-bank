import { inject, injectable } from "tsyringe";
import { IListAllBook } from "../../dto/IListAllBook";
import { IBookRepository } from "../../repository/IBookRepository";
import { IPaginationBooks } from "../../dto/IPaginationBooks";

@injectable()
export class ListAllBookUseCase {
  constructor(
    @inject("BookRepository")
    private bookRepository: IBookRepository
  ) {}

  async execute({ name, page, number_per_page }: IListAllBook): Promise<IPaginationBooks> {
    const result = await this.bookRepository.listAll({ name, page, number_per_page });

    const totalPage = Math.floor(result?.totalElements / number_per_page) + 1;

    return {
      books: result?.books,
      actualPage: page,
      totalElements: result?.totalElements,
      isNextPage: totalPage > page,
    } as IPaginationBooks;
  }

}
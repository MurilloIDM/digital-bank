import { inject, injectable } from "tsyringe";
import _differenceWith from "lodash.differencewith";

import { HttpException } from "../../../../infra/error/HttpException";
import { ICreateOrUpdateBook } from "../../dto/ICreateOrUpdateBook";
import { IBookRepository } from "../../repository/IBookRepository";

@injectable()
export class UpdateBookUseCase {
  constructor(
    @inject("BookRepository")
    private bookRepository: IBookRepository
  ) {}

  async execute({
    name,
    author,
    cover_url,
    number_of_pages,
    categories,
    id,
    userId
  }: ICreateOrUpdateBook): Promise<void> {
    const bookAlreadyExistWithId = this.bookRepository.findById(id);

    if (!bookAlreadyExistWithId) {
      throw new HttpException("Book does not exists.", 400);
    }

    const bookAlreadyExistForThisUser = await this.bookRepository.findByNameAndAuthorAndUser(name, author, userId);

    if (bookAlreadyExistForThisUser && bookAlreadyExistForThisUser?.id !== id) {
      throw new HttpException("Invalid book update.", 400);
    }

    const nameFormat = name.substring(0, 1).toUpperCase() + name.substring(1, name.length).toLowerCase();

    const disconnectCategories = _differenceWith(
      bookAlreadyExistForThisUser?.categories,
      categories,
      (a, b) => a.id === b.id
    );

    await this.bookRepository.update({
      name: nameFormat,
      author,
      cover_url,
      number_of_pages,
      categories,
      userId,
      id,
      disconnectCategories,
    });
  }
}
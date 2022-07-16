import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { ICreateOrUpdateBook } from "../../dto/ICreateOrUpdateBook";

import { IBookRepository } from "../../repository/IBookRepository";

@injectable()
export class CreateBookUseCase {
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
    userId,
  }: ICreateOrUpdateBook): Promise<void> {
    const bookAlreadyExist = await this.bookRepository.findByNameAndAuthorAndUser(name, author, userId);

    if (bookAlreadyExist) {
      throw new HttpException("Book already exists for this user.", 400);
    }

    const nameFormat = name.substring(0, 1).toUpperCase() + name.substring(1, name.length).toLowerCase();

    await this.bookRepository.create({
      name: nameFormat,
      author,
      cover_url,
      number_of_pages,
      categories,
      userId,
    });
  }
}
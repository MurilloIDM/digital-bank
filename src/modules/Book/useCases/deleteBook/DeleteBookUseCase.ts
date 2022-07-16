import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { IBookRepository } from "../../repository/IBookRepository";

@injectable()
export class DeleteBookUseCase {
  constructor(
    @inject("BookRepository")
    private bookRepository: IBookRepository
  ) {}

  async execute(id: string): Promise<void> {
    const bookAlreadyExist = await this.bookRepository.findById(id);

    if (!bookAlreadyExist) {
      throw new HttpException("Book does not exists.", 400);
    }

    await this.bookRepository.delete(id);
  }
  
}
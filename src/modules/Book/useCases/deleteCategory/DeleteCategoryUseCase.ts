import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { ICategoryRepository } from "../../repository/ICategoryRepository";

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new HttpException("Category not exists.", 400);
    }

    await this.categoryRepository.delete(id);
  }
}
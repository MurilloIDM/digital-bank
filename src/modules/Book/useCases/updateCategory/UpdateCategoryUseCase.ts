import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { ICategoryRepository } from "../../repository/ICategoryRepository";

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ id, name, description }): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findById(id);

    if (!categoryAlreadyExists) {
      throw new HttpException("Category not exists.", 400);
    }

    const categoryAlreadyExistsWithName = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExistsWithName && categoryAlreadyExistsWithName?.id !== id) {
      throw new HttpException("Category already exists with this name.", 400);
    }

    await this.categoryRepository.update({ name, description }, id);
  }
}
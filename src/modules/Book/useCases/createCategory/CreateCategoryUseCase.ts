import { inject, injectable } from "tsyringe";
import { HttpException } from "../../../../infra/error/HttpException";
import { ICreateOrUpdateCategory } from "../../dto/ICreateOrUpdateCategory";
import { ICategoryRepository } from "../../repository/ICategoryRepository";

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: ICreateOrUpdateCategory): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new HttpException("Category already exists with this name.", 400);
    }

    await this.categoryRepository.create({
      name: name?.toLowerCase(),
      description
    });

  }
  
}
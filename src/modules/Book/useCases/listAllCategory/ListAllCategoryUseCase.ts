import { Category } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repository/ICategoryRepository";

@injectable()
export class ListAllCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.listAll();
    return categories;
  }

}
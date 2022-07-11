import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllCategoryUseCase } from "./ListAllCategoryUseCase";

export class ListAllCategoryController {

  async handle(_request: Request, response: Response): Promise<Response<Category>> {
    const listAllCategoryUseCase = container.resolve(ListAllCategoryUseCase);

    const categories = await listAllCategoryUseCase.execute();

    if (!categories.length) {
      return response.status(204).send();
    }

    return response.json(categories);
  }

}
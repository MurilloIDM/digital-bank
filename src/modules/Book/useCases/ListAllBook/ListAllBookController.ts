import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";
import { IPaginationBooks } from "../../dto/IPaginationBooks";
import { ListAllBookUseCase } from "./ListAllBookUseCase";

export class ListAllBookController {

  async handle(request: Request, response: Response): Promise<Response<IPaginationBooks>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { name, page, number_per_page } = request.query;

    const listAllBookUseCase = container.resolve(ListAllBookUseCase);

    const result = await listAllBookUseCase.execute({
      name: String(name),
      page: Number(page),
      number_per_page: Number(number_per_page)
    });

    return response.json(result);
  }

}
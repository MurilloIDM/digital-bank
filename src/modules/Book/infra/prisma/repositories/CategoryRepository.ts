import { Category, PrismaClient } from "@prisma/client";
import { prisma } from "../../../../../database/prismaPostgres";
import { ICreateOrUpdateCategory } from "../../../dto/ICreateOrUpdateCategory";
import { ICategoryRepository } from "../../../repository/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create({ name, description }: ICreateOrUpdateCategory): Promise<void> {
    await this.prisma.category.create({
      data: {
        name,
        description,
      },
    });
  }

  async update({ name, description }: ICreateOrUpdateCategory, id: string): Promise<void> {
    await this.prisma.category.update({
      data: {
        name,
        description
      },
      where: { id }
    });
  }

  async listAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        name: "asc"
      } 
    });
    return categories;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          mode: "insensitive",
          equals: name
        }
      }
    });
    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    return category;
  }

}
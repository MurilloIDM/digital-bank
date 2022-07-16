import { Book, PrismaClient } from "@prisma/client";
import { prisma } from "../../../../../database/prismaPostgres";
import { IBook } from "../../../dto/IBook";

import { ICreateOrUpdateBook } from "../../../dto/ICreateOrUpdateBook";
import { IListAllBook } from "../../../dto/IListAllBook";
import { IPaginationBooks } from "../../../dto/IPaginationBooks";
import { IBookRepository } from "../../../repository/IBookRepository";

export class BookRepository implements IBookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create({
    name,
    author,
    cover_url,
    number_of_pages,
    userId,
    categories,
  }: ICreateOrUpdateBook): Promise<void> {
    await this.prisma.book.create({
      data: {
        name,
        author,
        cover_url,
        number_of_pages,
        categories: {
          connect: categories,
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async update({
    id,
    name,
    author,
    cover_url,
    number_of_pages,
    categories,
    disconnectCategories,
  }: ICreateOrUpdateBook): Promise<void> {
    await this.prisma.book.update({
      data: {
        name,
        author,
        cover_url,
        number_of_pages,
        categories: {
          connect: categories,
          disconnect: disconnectCategories
        }
      },
      where: { id },
    });
  }

  async listAll({ name, page, number_per_page }: IListAllBook): Promise<IPaginationBooks> {
    const skipValue = page * number_per_page;

    const queryDetails = {
      skip: skipValue,
      take: number_per_page,
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            description: true,
          }
        }
      }
    };

    if (name) {
      queryDetails["where"] = {
        name: {
          mode: "insensitive",
          contains: name,
        }
      };

      const books = await this.prisma.book.findMany(queryDetails);

      const totalBooks = await this.prisma.book.count({
        select: {
          _all: true,
        },
        where: {
          name: {
            mode: "insensitive",
            contains: name
          }
        }
      });

      return {
        books,
        totalElements: totalBooks?._all,
      };
    }

    const books = await this.prisma.book.findMany(queryDetails);
    const totalBooks = await this.prisma.book.count({ select: { _all: true } });

    return {
      books,
      totalElements: totalBooks?._all,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({ where: { id }});
  }

  async findByNameAndAuthorAndUser(name: string, author: string, userId: string): Promise<IBook> {
    const book = await this.prisma.book.findFirst({
      include: {
        categories: {
          select: {
            id: true
          }
        }
      },
      where: {
        author: {
          mode: "insensitive",
          equals: author,
        },
        name: {
          mode: "insensitive",
          equals: name,
        },
        userId
      },
    });

    return book;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    return book;
  }

}
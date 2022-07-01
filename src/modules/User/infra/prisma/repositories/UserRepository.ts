import { IUser } from "../../../dto/IUser";
import { ICreateOrUpdateUser } from "../../../dto/ICreateOrUpdateUser";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { PrismaClient, User } from "@prisma/client";
import { prisma } from "../../../../../database/prismaPostgres";

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create({ name, email, password, rolesId }: ICreateOrUpdateUser): Promise<void> {
    await this.prisma.user.create({
      data: {
        name,
        password,
        email,
        roles: {
          connect: [...rolesId]
        }
      }
    });
  }

  async update({
    name,
    email,
    password,
    rolesId,
    rolesDisconnect,
  }: ICreateOrUpdateUser, id: string): Promise<void> {
    await this.prisma.user.update({
      data: {
        name,
        password,
        email,
        roles: {
          connect: [...rolesId],
          disconnect: [...rolesDisconnect]
        }
      },
      where: {
        id
      },
    });
  }

  async listAll(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        roles: true,
      },
    });
    return users;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });
    return user;
  }

}
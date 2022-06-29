import { PrismaClient, Role } from "@prisma/client";

import { prisma } from "../../../../../database/prismaPostgres";
import { ICreateRole } from "../../../dto/ICreateRole";
import { IRoleRepository } from "../../../repositories/IRoleRepository";

export class RoleRepository implements IRoleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create({ name, description }: ICreateRole): Promise<void> {
    await this.prisma.role.create({
      data: {
        name,
        description
      }
    });
  }

  async listAll(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({ orderBy: { name: "asc" } });
    return roles;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({ where: { id } });
  }

  async findById(id: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({ where: { id } });
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.prisma.role.findFirst({
      where: {
        name: {
          mode: "insensitive",
          equals: name,
        }
      }
    });

    return role;
  }

}
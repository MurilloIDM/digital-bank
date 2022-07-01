import { Role } from "@prisma/client";

export interface IUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}
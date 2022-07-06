export interface IUserRole {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roles: IRole[];
}

interface IRole {
  id: string;
}
export interface ICreateOrUpdateUser {
  name: string;
  email: string;
  password: string;
  rolesId: IUserRole[];
  rolesDisconnect?: IUserRole[];
}

interface IUserRole {
  id: string;
}
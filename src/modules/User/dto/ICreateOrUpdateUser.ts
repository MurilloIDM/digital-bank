export interface ICreateOrUpdateUser {
  name: string;
  email: string;
  password: string;
  rolesId: IUserRole[];
  rolesDisconnect?: IUserRole[];
}

export interface IUserRole {
  id: string;
}
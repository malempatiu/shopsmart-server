import { BaseUserDto } from '../dtos/userDto';

export interface IUserRepo {
  getUserByEmail: (email: string) => Promise<BaseUserDto | null>;
  saveUser: (email: string, password: string) => Promise<BaseUserDto>;
  getUserPassword: (email: string) => Promise<string | null>;
}
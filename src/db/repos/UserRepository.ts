import User from '../models/User';
import { BaseUserDto } from '../dtos/userDto';
import { UserMapper } from '../mappers/UserMapper';
import { IUserRepo } from './types';

class UserRepository implements IUserRepo {
  getUserByEmail = async (email: string): Promise<BaseUserDto | null> => {
    const user = await User.findOne({where: { email }});
    if (!user) return null;
    return UserMapper.toBaseUserDto(user);
  };

  saveUser = async (email: string, password: string): Promise<BaseUserDto> => {
    const user = await User.create({ 
      email, 
      password 
    });
    return UserMapper.toBaseUserDto(user);
  };

  getUserPassword = async (email: string): Promise<string | null> => {
    const user = await User.findOne({where: { email }});
    if (!user) return null;
    return user.password;
  };
}

export { UserRepository };
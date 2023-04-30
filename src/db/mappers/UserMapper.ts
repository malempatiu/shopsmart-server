import User from '../models/User';
import { BaseUserDto } from '../dtos/userDto';

class UserMapper {
  static toBaseUserDto = (user: User): BaseUserDto => {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      image: user.image ?? null
    };
  };
}

export { UserMapper };
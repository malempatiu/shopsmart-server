import { UserDto } from '@dtos/userDto';
import { IUserRepo } from '@repos/types';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { BadRequestException } from '../exceptions/BadRequestException';
import { InternalException } from '../exceptions/InternalException';
import { NotAuthorizedException } from '../exceptions/NotAuthorizedException';

export interface IUserService {
  createUser(email: string, password: string): Promise<UserDto>;
  signInUser(email: string, password: string): Promise<UserDto>;
}

class UserService implements IUserService {
  private readonly userRepo: IUserRepo;
  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  createUser = async (email: string, password: string): Promise<UserDto> => {
    let baseUserDto = await this.userRepo.getUserByEmail(email);
    if(baseUserDto) throw new BadRequestException(`User with email ${ email } already exists`);

    const hashPassword = await hash(password, 10);
    baseUserDto = await this.userRepo.saveUser(email, hashPassword);

    if (!process.env.SIGN_SECRET) throw new InternalException('Sign secret is required');
    const token = sign({
      id: baseUserDto.id, 
      email: baseUserDto.email,
      firstName: baseUserDto.firstName,
      lastName: baseUserDto.lastName,
      image: baseUserDto.image
    }, process.env.SIGN_SECRET);

    return {
      ...baseUserDto,
      jwtToken: token
    };
  };

  signInUser = async (email: string, password: string): Promise<UserDto> => {
    const baseUserDto = await this.userRepo.getUserByEmail(email);
    if(!baseUserDto) throw new BadRequestException(`No user found for the given email ${ email }`);

    const storedPassword = await this.userRepo.getUserPassword(email);
    if (!storedPassword) throw new BadRequestException(`No user found for the given email ${ email }`);

    const isValid = await compare(password, storedPassword);
    if (!isValid) throw new NotAuthorizedException('Invalid password!');

    if (!process.env.SIGN_SECRET) throw new InternalException('Sign secret is required');
    const token = sign({
      id: baseUserDto.id, 
      email: baseUserDto.email,
      firstName: baseUserDto.firstName,
      lastName: baseUserDto.lastName,
      image: baseUserDto.image
    }, process.env.SIGN_SECRET);
    
    return {
      ...baseUserDto,
      jwtToken: token
    };
  };
}

export { UserService };
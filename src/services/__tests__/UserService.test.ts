import { UserService } from '../UserService';
import bcrypt from 'bcrypt';

const users = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'password1'
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'password2'
  },
  {
    id: 3,
    email: 'user3@example.com',
    password: 'password3'
  },
];

describe('UserService', () => {
  const env = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });
  describe('createUser', () => {
    const userService = new UserService({
      getUserByEmail: jest.fn().mockResolvedValueOnce(users[0]).mockResolvedValueOnce(null),
      saveUser: jest.fn().mockResolvedValue(users[1]),
      getUserPassword: jest.fn().mockResolvedValueOnce(null)
    });
    it('should return error if user already exists', async () => {
      await expect(userService.createUser(users[0].email, users[0].password)).rejects.toThrowError(`User with email ${ users[0].email } already exists`);
    });

    it('should return user details with token', async () => {
      process.env.SIGN_SECRET = '123456789';
      const userDto = await userService.createUser(users[1].email, users[1].password);
      expect(userDto.id).toBe(9);
      expect(userDto.email).toBe(users[1].email);
      expect(userDto.firstName).toBeUndefined();
      expect(userDto.lastName).toBeUndefined();
      expect(userDto.image).toBeUndefined();
      expect(userDto.jwtToken).toBeDefined();
      expect(userDto.jwtToken.length).not.toBe(0);
    });
  });

  describe('signInUser', () => {
    const userService = new UserService({
      getUserByEmail: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(users[1]).mockResolvedValueOnce(users[1]),
      saveUser: jest.fn().mockResolvedValue(users[1]),
      getUserPassword: jest.fn().mockResolvedValueOnce('j+dfj.jsdf.').mockResolvedValueOnce('j+dfj.jsdf.'),
    });
    it('should return error if user for the given email is not exist', async () => {
      await expect(userService.signInUser(users[2].email, users[2].password)).rejects.toThrowError(`No user found for the given email ${ users[2].email }`);
    });

    it('should return error valid wrong password', async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      await expect(userService.signInUser(users[1].email, 'password22')).rejects.toThrowError('Invalid password!');
    });

    it('should return user details with token', async () => {
      process.env.SIGN_SECRET = '123456789';
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const userDto = await userService.signInUser(users[1].email, users[1].password);
      expect(userDto.id).toBe(users[1].id);
      expect(userDto.email).toBe(users[1].email);
      expect(userDto.firstName).toBeUndefined();
      expect(userDto.lastName).toBeUndefined();
      expect(userDto.image).toBeUndefined();
      expect(userDto.jwtToken).toBeDefined();
      expect(userDto.jwtToken.length).not.toBe(0);
    });
  });
});
import crypto from 'crypto';
import User from '../../models/User';
import { UserRepository } from '../UserRepository';

describe('UserRepository', () => {
  const userRepository = new UserRepository();
  describe('getUserByEmail', () => {
    it('should return no user for the given email which does not exist in db', async () => {
      const unknownEmail = 'abc@abc.com';
      User.findOne = jest.fn().mockResolvedValue(null);
      const user = await userRepository.getUserByEmail(unknownEmail);
      expect(User.findOne).toHaveBeenCalledWith({where: {email: unknownEmail}});
      expect(user).toBeNull();
    });

    it('should return user for the given email which exist in db', async () => {
      const knownEmail = 'abc@example.com';
      User.findOne = jest.fn().mockResolvedValue({
        id: 1,
        email: knownEmail,
        password: crypto.randomUUID(),
        firstName: null,
        lastName: null,
        image: null
      });
      const user = await userRepository.getUserByEmail(knownEmail);
      expect(User.findOne).toHaveBeenCalledWith({where: {email: knownEmail}});
      expect(user).not.toBeNull();
      expect(user).toHaveProperty('id', 1);
      expect(user).toHaveProperty('email', knownEmail);
      expect(user).toHaveProperty('firstName', null);
      expect(user).toHaveProperty('lastName', null);
      expect(user).toHaveProperty('image', null);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const email = 'abc@example.com';
      const password = crypto.randomUUID();
      User.create = jest.fn().mockResolvedValue({
        id: 2,
        email,
        password,
        firstName: null,
        lastName: null,
        image: null
      });
      const user = await userRepository.saveUser(email, password);
      expect(User.create).toHaveBeenCalledWith({ 
        email,
        password 
      });
      expect(user).not.toBeNull();
      expect(user).toHaveProperty('id', 2);
      expect(user).toHaveProperty('email', email);
      expect(user).toHaveProperty('firstName', null);
      expect(user).toHaveProperty('lastName', null);
      expect(user).toHaveProperty('image', null);
    });
  });
});
import dotEnv from 'dotenv';
dotEnv.config();

import { App } from './App';
import { UserController } from './controllers/UserController'; 
import { UserService } from './services/UserService';
import { UserRepository } from './db/repos/UserRepository';

const app = new App(3000, [
  new UserController(new UserService(new UserRepository()))
]);
app.start();
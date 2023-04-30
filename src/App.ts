import './db/models';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { ErrorHandler } from './middlewares/ErrorHandler';
import { NotFoundException } from './exceptions/NotFoundException';

type Controller = {
  router: express.Router;
}

class App {
  private readonly app = express();
  private readonly PATH = '/api';
  private readonly PORT: number;

  constructor(port: number, controllers: Controller[]) {
    this.PORT = port;
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleWare();
  }

  private initializeMiddleware = () => {
    this.app.use(express.json());
    this.app.use(cors());
  };

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(this.PATH, controller.router);
    });
    this.app.all('*', (req: Request, res: Response) => {
      throw new NotFoundException('Route Not Found!');
    });
  }

  private initializeErrorMiddleWare = () => {
    this.app.use(ErrorHandler.handleError);
  };
  
  start = () => {
    this.app.listen(this.PORT, () => {
      console.log(`Server listening on port: ${ this.PORT }`);
    });
  };
}

export { App };
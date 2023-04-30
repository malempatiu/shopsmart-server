import { Router, Request, Response, NextFunction} from 'express';
import { z } from 'zod';
import { BadRequestException } from '../exceptions/BadRequestException';
import { InternalException } from '../exceptions/InternalException';
import { catchAsyncError } from '../utils/catchAsyncError';
import { IUserService } from '../services/UserService';

const authSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]).{8,}/g, 
        'Password must have both upper and lower case letters and at least one digit and symbol character'),
  })
});

class UserController {
  public readonly router = Router();
  private readonly PATH = '/user';
  private readonly userService: IUserService;
  
  constructor(userService: IUserService) {
    this.userService = userService;
    this.initializeController();
  }

  private validate = (schema: typeof authSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        throw new BadRequestException(err.issues[0].message);
      }
      throw new InternalException('Something went wrong during validation of User');
    }
  };

  initializeController = () => {
    this.router.post(
      `${ this.PATH }/register`, 
      this.validate(authSchema), 
      catchAsyncError(this.userRegister)
    );
    this.router.post(
      `${ this.PATH }/login`, 
      this.validate(authSchema), 
      catchAsyncError(this.userLogin)
    );
  };

  userRegister = async (req: Request, res: Response) => {
    const userDto = await this.userService.createUser(req.body.email, req.body.password);
    return res.status(201).json(userDto);
  };

  userLogin = async (req: Request, res: Response) => {
    const userDto = await this.userService.signInUser(req.body.email, req.body.password);
    return res.status(200).json(userDto);
  };
}

export { UserController };
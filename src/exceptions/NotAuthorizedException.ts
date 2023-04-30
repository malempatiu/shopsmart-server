import { AppError } from './AppError';

export class NotAuthorizedException extends AppError {
  readonly status = 401;
  readonly message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
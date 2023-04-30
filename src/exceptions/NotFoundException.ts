import { AppError } from './AppError';

export class NotFoundException extends AppError {
  readonly status = 404;
  readonly message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
import { AppError } from './AppError';

export class BadRequestException extends AppError {
  readonly status = 400;
  readonly message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
import { AppError } from './AppError';

export class InternalException extends AppError {
  readonly status = 500;
  readonly message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
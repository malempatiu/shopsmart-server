abstract class AppError extends Error {
  abstract status: number;
  abstract message: string;
  protected constructor() {
    super();    
  }
}

export { AppError };
export class FoodceptionHttpException extends Error {
  public statusCode: number;
  public url: string;
  public method: string;

  constructor(
    message: string,
    statusCode: number,
    url: string,
    method: string
  ) {
    super(message);
    this.name = 'FoodceptionHttpException';
    this.statusCode = statusCode;
    this.url = url;
    this.method = method;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FoodceptionHttpException);
    }
  }
}

export class FoodceptionUnauthorizedException extends Error {
  status: number;
  url: string;
  method: string;

  constructor(message: string, status: number, url: string, method: string) {
    super(message);
    this.name = 'FoodceptionUnauthorizedException';
    this.status = status;
    this.url = url;
    this.method = method;
  }
}

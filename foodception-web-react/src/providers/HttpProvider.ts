import { FoodceptionHttpException } from '../exceptions/FoodceptionHttpException';
import { ErrorUtils } from '../utils/ErrorUtils';
import HttpUtils from '../utils/HttpUtils';

export default class HttpProvider {
  private static async request(
    url: string,
    method: string,
    body?: any,
    headers: HeadersInit = {}
  ): Promise<any> {
    try {
      if (!HttpUtils.isAbsoluteUrl(url)) {
        url = process.env.REACT_APP_API_URL + url;
      }
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : null
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || response.statusText);
      }

      return await response.json();
    } catch (error: any) {
      const message = `Error fetching ${url} with ${method} method. ${error.message}`;
      console.error(message, error);
      ErrorUtils.logErrorProperties(error);
      throw new FoodceptionHttpException(message, 500, url, method);
    }
  }

  static async get(url: string, headers?: HeadersInit): Promise<any> {
    return this.request(url, 'GET', null, headers);
  }

  static async post(
    url: string,
    body: any,
    headers?: HeadersInit
  ): Promise<any> {
    return this.request(url, 'POST', body, headers);
  }

  static async put(
    url: string,
    body: any,
    headers?: HeadersInit
  ): Promise<any> {
    return this.request(url, 'PUT', body, headers);
  }

  static async delete(url: string, headers?: HeadersInit): Promise<any> {
    return this.request(url, 'DELETE', null, headers);
  }
}

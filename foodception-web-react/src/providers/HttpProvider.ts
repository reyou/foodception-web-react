import { FoodceptionHttpException } from '../exceptions/FoodceptionHttpException';
import { FoodceptionUnauthorizedException } from '../exceptions/FoodceptionUnauthorizedException';
import AuthUtils from '../utils/AuthUtils';
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
      const authToken = AuthUtils.getAuthTokenFromLocalStorage();

      const finalHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
      };

      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : null
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        if (response.status === 401) {
          throw new FoodceptionUnauthorizedException(
            errorMessage,
            response.status,
            url,
            method
          );
        } else {
          throw new FoodceptionHttpException(
            errorMessage,
            response.status,
            url,
            method
          );
        }
      }

      return await response.json();
    } catch (error: any) {
      if (
        error instanceof FoodceptionHttpException ||
        error instanceof FoodceptionUnauthorizedException
      ) {
        throw error;
      }
      const message = `FoodceptionHttpProvider: Error fetching ${url} with ${method} method. ${error.message}`;
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

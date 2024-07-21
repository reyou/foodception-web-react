export default class HttpProvider {
  private static async request(
    url: string,
    method: string,
    body?: any,
    headers: HeadersInit = {}
  ): Promise<any> {
    try {
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
    } catch (error) {
      console.error(`HTTP ${method} request to ${url} failed:`, error);
      throw error;
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

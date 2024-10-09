export default class HttpUtils {
  // Method to check if a given URL is absolute
  public static isAbsoluteUrl(url: string): boolean {
    // Regular expression to validate if it is an absolute URL (starting with http:// or https://)
    const absoluteUrlPattern = new RegExp('^(https?:)//');

    // Return true if the URL matches the absolute URL pattern
    return absoluteUrlPattern.test(url);
  }
}

import ParentWindowUtils from './ParentWindowUtils';

export class FrontEndUtils {
  static getPageRoot(): URL {
    return new URL(window.location.pathname, window.location.origin);
  }
  static handleLinkClick(event: React.MouseEvent<Element>, url: string): void {
    // Short-circuit if not inside an iframe
    if (!FrontEndUtils.isInsideIframe()) {
      return; // Do nothing and let the default link behavior happen
    }

    // Only act if it's a left-click (event.button === 0) and inside iframe
    if (event.button === 0) {
      event.preventDefault(); // Prevent default navigation behavior
      ParentWindowUtils.postMessage({ type: 'redirect', url: url }); // Send message to parent window
    }
  }
  static isInsideIframe() {
    return window.self !== window.top;
  }

  static getAdjustedUrl(url: string): string {
    const isInsideIframe = FrontEndUtils.isInsideIframe();
    const baseUrl = isInsideIframe
      ? process.env.REACT_APP_WEB_URL // Use environment variable for iframe case
      : window.location.origin; // Use current origin if not inside iframe (https://web.foodception.com)

    // Check if the URL is absolute
    const isAbsoluteUrl = /^https?:\/\//i.test(url);

    // Helper function to remove unnecessary query parameters
    const removeUnwantedParams = (parsedUrl: URL): void => {
      parsedUrl.searchParams.delete('iframeId');
      parsedUrl.searchParams.delete('time');
    };

    // If not inside iframe and the URL is absolute, return it as is
    if (!isInsideIframe && isAbsoluteUrl) {
      return url;
    }

    // If inside iframe and the URL is absolute, replace the origin with the base URL
    if (isInsideIframe && isAbsoluteUrl) {
      // Parse the existing URL to extract the path and query string
      const parsedUrl = new URL(url);
      removeUnwantedParams(parsedUrl);
      const adjustedUrl = new URL(
        parsedUrl.pathname + parsedUrl.search,
        baseUrl
      ).toString();
      return adjustedUrl;
    }

    // If inside iframe and the URL is relative, adjust it using the base URL
    if (isInsideIframe && !isAbsoluteUrl) {
      const adjustedUrl = new URL(url, baseUrl);
      removeUnwantedParams(adjustedUrl);
      return adjustedUrl.toString();
    }

    // If the URL is relative and not inside iframe, adjust it using the window origin
    const adjustedUrl = new URL(url, baseUrl).toString();
    return adjustedUrl;
  }

  static async delay(milliSeconds: number) {
    await new Promise((resolve) => setTimeout(resolve, milliSeconds));
  }

  static slugify(text: string) {
    return text
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  }
  static capitalizeText(text: string) {
    return text
      .split(' ')
      .map((word) => {
        return word
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('-');
      })
      .join(' ');
  }
  static truncateText(text: string, maxLength: number) {
    // Check if the text length is greater than the maxLength
    if (text.length > maxLength) {
      // Truncate the text and append '...'
      return text.substring(0, maxLength) + '...';
    }
    // Return the full text if it's within the maxLength
    return text;
  }

  static getResizedImagePath(imageUrl: string, width: number, height: number) {
    const transformation = `/v1/fill/w_${width},h_${height}/`;
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/'));
    const fullImageUrl = imageUrl + transformation + fileName;
    return fullImageUrl;
  }

  static capitalizeFirstLetter(str: string) {
    if (str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

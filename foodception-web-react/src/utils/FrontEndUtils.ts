export class FrontEndUtils {
  static isInsideIframe() {
    return window.self !== window.top;
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

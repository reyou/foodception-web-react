import { FrontEndUtils } from './FrontEndUtils';

describe('FrontEndUtils', () => {
  let originalWindowLocation: any;
  beforeAll(() => {
    // Save the original window.location to restore after tests
    originalWindowLocation = { ...window.location };
  });

  afterAll(() => {
    // Restore window.location after tests
    window.location = originalWindowLocation;
  });

  describe('getAdjustedUrl', () => {
    it('should return the same URL if it is absolute', () => {
      const url = 'https://example.com/page?query=test';
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);
      expect(adjustedUrl).toBe(url);
    });

    it('should construct an absolute URL when a relative URL is passed and not in iframe', () => {
      // Mock window.location.origin
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://web.foodception.com'
        },
        writable: true
      });
      const relativeUrl = '/recipes/list?query=burger';
      const expectedUrl =
        'https://web.foodception.com/recipes/list?query=burger';
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(relativeUrl);
      expect(adjustedUrl).toBe(expectedUrl);
    });

    it('should construct a URL with the environment base URL when inside iframe', () => {
      // Mock window.location.origin
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://web.foodception.com'
        },
        writable: true
      });

      // Mock environment variable for iframe case
      process.env.REACT_APP_WEB_URL = 'https://www.foodception.com';

      // Mock the isInsideIframe method to return true
      jest.spyOn(FrontEndUtils, 'isInsideIframe').mockReturnValue(true);
      const relativeUrl = '/recipes/list?query=burger';
      const expectedUrl =
        'https://www.foodception.com/recipes/list?query=burger';
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(relativeUrl);
      expect(adjustedUrl).toBe(expectedUrl);
    });

    it('should construct a URL with the environment full URL when inside iframe', () => {
      // Mock window.location.origin
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://web.foodception.com'
        },
        writable: true
      });

      // Mock environment variable for iframe case
      process.env.REACT_APP_WEB_URL = 'https://www.foodception.com';

      // Mock the isInsideIframe method to return true
      jest.spyOn(FrontEndUtils, 'isInsideIframe').mockReturnValue(true);
      const fullUrl = 'https://web.foodception.com/recipes/list?query=burger';
      const expectedUrl =
        'https://www.foodception.com/recipes/list?query=burger';
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(fullUrl);
      expect(adjustedUrl).toBe(expectedUrl);
    });

    it('should construct a URL with the window location origin when not inside iframe', () => {
      // Mock the isInsideIframe method to return false
      jest.spyOn(FrontEndUtils, 'isInsideIframe').mockReturnValue(false);
      const relativeUrl = '/recipes/list?query=burger';
      const expectedUrl =
        'https://web.foodception.com/recipes/list?query=burger';
      // Mock window.location.origin
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://web.foodception.com'
        },
        writable: true
      });

      const adjustedUrl = FrontEndUtils.getAdjustedUrl(relativeUrl);

      expect(adjustedUrl).toBe(expectedUrl);
    });
  });
});

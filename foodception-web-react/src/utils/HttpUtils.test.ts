import HttpUtils from './HttpUtils'; // Adjust the path if necessary

describe('HttpUtils.isAbsoluteUrl', () => {
  // Test for valid absolute URLs (http and https)
  test('should return true for valid absolute URLs', () => {
    expect(HttpUtils.isAbsoluteUrl('http://example.com')).toBe(true);
    expect(HttpUtils.isAbsoluteUrl('https://example.com')).toBe(true);
    expect(HttpUtils.isAbsoluteUrl('http://example.com/path')).toBe(true);
    expect(
      HttpUtils.isAbsoluteUrl('https://subdomain.example.com/resource')
    ).toBe(true);
  });

  // Test for relative URLs
  test('should return false for relative URLs', () => {
    expect(HttpUtils.isAbsoluteUrl('/about')).toBe(false);
    expect(HttpUtils.isAbsoluteUrl('path/to/resource')).toBe(false);
    expect(HttpUtils.isAbsoluteUrl('../parent/dir')).toBe(false);
    expect(HttpUtils.isAbsoluteUrl('./local/file')).toBe(false);
  });

  // Test for non-http/https URLs (which should return false)
  test('should return false for non-http/https absolute URIs', () => {
    expect(HttpUtils.isAbsoluteUrl('ftp://example.com')).toBe(false);
    expect(HttpUtils.isAbsoluteUrl('mailto:test@example.com')).toBe(false);
    expect(HttpUtils.isAbsoluteUrl('file:///C:/path/to/file')).toBe(false);
  });

  // Test for invalid and empty inputs
  test('should return false for invalid and empty inputs', () => {
    expect(HttpUtils.isAbsoluteUrl('')).toBe(false);
    expect(HttpUtils.isAbsoluteUrl('not-a-url')).toBe(false);
    expect(HttpUtils.isAbsoluteUrl('://no-scheme')).toBe(false);
  });
});

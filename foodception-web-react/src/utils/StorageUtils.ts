export default class StorageUtils {
  static setItemWithExpiry(key: string, value: any, ttl: number) {
    const now = new Date();

    // `ttl` is time to live in milliseconds
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    };

    sessionStorage.setItem(key, JSON.stringify(item));
  }

  static getItemWithExpiry(key: string) {
    const itemStr = sessionStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage and return null
      sessionStorage.removeItem(key);
      return null;
    }

    return item.value;
  }
}

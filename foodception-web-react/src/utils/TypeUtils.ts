export default class TypeUtils {
  static getBool(val: string | null, defaultVal: boolean) {
    if (!val || val === '') {
      return defaultVal;
    }
    return val.toLowerCase() === 'true';
  }
  static getRandomFromArray(items: any[]) {
    return items[Math.floor(Math.random() * items.length)];
  }
}

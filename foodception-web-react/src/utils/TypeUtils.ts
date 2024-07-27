export default class TypeUtils {
  static getBool(val: string | null, defaultVal: boolean) {
    if (!val || val === '') {
      return defaultVal;
    }
    return val.toLowerCase() === 'true';
  }
}

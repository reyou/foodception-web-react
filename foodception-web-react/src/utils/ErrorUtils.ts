export class ErrorUtils {
  static logErrorProperties(error: any): void {
    console.log('Logging all properties of the error:');

    Object.getOwnPropertyNames(error).forEach((prop) => {
      console.log(`${prop}:`, error[prop]);
    });
  }
}

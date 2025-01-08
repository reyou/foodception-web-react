export class ErrorUtils {
  static logErrorProperties(error: any): void {
    console.log('LogGuid: 01552091-1afb-4e96-b8f6-908fd72af4d4');
    console.log('Logging all properties of the error:');

    Object.getOwnPropertyNames(error).forEach((prop) => {
      console.log(`${prop}:`, error[prop]);
    });
  }
}

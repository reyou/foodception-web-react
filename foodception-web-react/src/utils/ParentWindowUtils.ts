import { ErrorDetails } from "../types/error.types";

export default class ParentWindowUtils {
  static postMessage(data: any) {
    const params = new URLSearchParams(window.location.search);
    const iframeId = params.get('iframeId') || 'N/A';
    window.parent.postMessage(
      {
        iframeId,
        ...data
      },
      '*'
    );
  }

  static sendLoginData(data: any) {
    ParentWindowUtils.postMessage({
      type: 'login',
      loginData: data
    });
  }

  static sendForgotPasswordData(data: any) {
    ParentWindowUtils.postMessage({
      type: 'forgotPassword',
      forgotPasswordData: data
    });
  }

  static sendError(error: ErrorDetails) {
    ParentWindowUtils.postMessage({
      type: 'error',
      error
    });
  }
}

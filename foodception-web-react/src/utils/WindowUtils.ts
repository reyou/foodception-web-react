export default class WindowUtils {
  private static previousHeight: number | null = null;
  private static intervalId: number | null = null;

  static sendMessage(): void {
    const height = document.documentElement.scrollHeight;

    // Only post message if height has changed
    if (height !== WindowUtils.previousHeight) {
      window.parent.postMessage({ type: 'resizeIframe', height }, '*');
      WindowUtils.previousHeight = height;
    }
  }

  static addResizeListener(): void {
    // Start interval to send resize messages
    WindowUtils.sendMessage(); // Send the message initially
    WindowUtils.intervalId = window.setInterval(WindowUtils.sendMessage, 200);
  }

  static removeResizeListener(): void {
    // Clear the interval if it exists
    if (WindowUtils.intervalId !== null) {
      window.clearInterval(WindowUtils.intervalId);
      WindowUtils.intervalId = null;
    }
  }
}

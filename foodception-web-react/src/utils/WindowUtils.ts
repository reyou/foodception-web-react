export default class WindowUtils {
  private static previousHeight: number | null = null;
  private static intervalId: number | null = null;

  static sendMessage(iframeId: string): void {
    const height = document.documentElement.scrollHeight;

    // Only post message if height has changed
    if (height !== WindowUtils.previousHeight) {
      window.parent.postMessage(
        {
          type: 'resizeIframe',
          iframeId,
          location: window.location.href,
          height
        },
        '*'
      );
      WindowUtils.previousHeight = height;
    }
  }

  static addResizeListener(iframeId: string): void {
    // Clear any existing interval to avoid multiple intervals running
    WindowUtils.removeResizeListener();

    // Send the message initially
    WindowUtils.sendMessage(iframeId);

    // Start interval to send resize messages
    WindowUtils.intervalId = window.setInterval(() => {
      WindowUtils.sendMessage(iframeId);
    }, 200);
  }

  static removeResizeListener(): void {
    // Clear the interval if it exists
    if (WindowUtils.intervalId !== null) {
      window.clearInterval(WindowUtils.intervalId);
      WindowUtils.intervalId = null;
    }
  }
}

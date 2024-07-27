export default class WindowState {
  private static previousHeight: number | null = null;
  private static intervalId: number | null = null;

  static sendMessage(iframeId: string): void {
    const height = document.documentElement.scrollHeight;

    // Only post message if height has changed
    if (height !== WindowState.previousHeight) {
      window.parent.postMessage(
        {
          type: 'resizeIframe',
          iframeId,
          location: window.location.href,
          height
        },
        '*'
      );
      WindowState.previousHeight = height;
    }
  }

  static addResizeListener(iframeId: string): void {
    // Clear any existing interval to avoid multiple intervals running
    WindowState.removeResizeListener();

    // Send the message initially
    WindowState.sendMessage(iframeId);

    // Start interval to send resize messages
    WindowState.intervalId = window.setInterval(() => {
      WindowState.sendMessage(iframeId);
    }, 200);
  }

  static removeResizeListener(): void {
    // Clear the interval if it exists
    if (WindowState.intervalId !== null) {
      window.clearInterval(WindowState.intervalId);
      WindowState.intervalId = null;
    }
  }
}

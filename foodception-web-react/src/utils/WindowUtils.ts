export default class WindowUtils {
  static sendMessage(): void {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: 'resizeIframe', height }, '*');
  }

  static addResizeListener(): void {
    window.addEventListener('resize', WindowUtils.sendMessage);
    // Send the message initially when the listener is added
    WindowUtils.sendMessage();
  }

  static removeResizeListener(): void {
    window.removeEventListener('resize', WindowUtils.sendMessage);
  }
}

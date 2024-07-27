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
}

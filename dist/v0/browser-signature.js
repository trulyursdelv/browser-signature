/**
 * browser-signature v0
 * https://github.com/trulyursdelv/browser-signature
 *
 * Released under the CC0-1.0 license
 * https://github.com/trulyursdelv/browser-signature#license
 *
 * Date: 2025-08-19
 */

(() => {

class BrowserSignature {
  static generate() {
    const browser = [
      navigator.appName,
      navigator.appCodeName,
      navigator.product,
      navigator.productSub,
      navigator.vendor
    ].join("");
    const device = [
      screen.availHeight,
      screen.availWidth,
      screen.pixelDepth,
      screen.colorDepth,
      navigator.hardwareConcurrency,
      navigator.maxTouchPoints,
      window.devicePixelRatio,
    ].join("");
    const feature = [
      "WebGL2RenderingContext",
      "Worker",
      "WebSocket",
      "WebAssembly",
      "RTCCertificate",
      "IDBDatabase"
    ].map(feat => (feat in window).toString()).join("");
    
    const signed = [
      BrowserSignature.hash(browser),
      BrowserSignature.hash(device),
      BrowserSignature.hash(feature)
    ].join("");
    
    return BrowserSignature.hash(signed);
  }
  
  static hash(str) {
    let h1 = 0xdeadbeef ^ 0;
    let h2 = 0x41c6ce57 ^ 0;
    for(let i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
}

window.BrowserSignature = BrowserSignature;

})();
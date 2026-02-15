import '@testing-library/jest-dom';
// Polyfill IntersectionObserver for test environment (JSDOM)
if (typeof window.IntersectionObserver === 'undefined') {
  class IntersectionObserver {
    constructor(callback, options) {
      this._callback = callback;
      this.root = options?.root || null;
      this.rootMargin = options?.rootMargin || '';
      this.threshold = options?.threshold || 0;
    }
    observe(target) {
      const entry = { isIntersecting: true, target };
      this._callback([entry], this);
    }
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = IntersectionObserver;
}

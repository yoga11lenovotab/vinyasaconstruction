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

// Polyfill for window.matchMedia used in tests (JSDOM)
if (typeof window.matchMedia === 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    value: function() {
      return {
        matches: false,
        media: '',
        onchange: null,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {},
        dispatchEvent: function() { return false; }
      };
    }
  });
}

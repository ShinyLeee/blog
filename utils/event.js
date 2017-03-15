export const on = (el, type, callback) => {
  if (el.addEventListener) {
    el.addEventListener(type, callback);
  } else {
    // IE8+ Support
    el.attachEvent(`on${type}`, () => {
      callback.call(el);
    });
  }
};

export const off = (el, type, callback) => {
  if (el.removeEventListener) {
    el.removeEventListener(type, callback);
  } else {
    // IE8+ Support
    el.detachEvent(`on${type}`, callback);
  }
};

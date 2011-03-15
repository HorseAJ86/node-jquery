  return window.jQuery;
}
if ('undefined' === typeof module) { module = {}; }
module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;
if ('undefined' === typeof provide) { provide = function () {};  }
provide('jquery');
}());


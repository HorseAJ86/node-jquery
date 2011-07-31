
  // begin npm / ender footer
  window.jQuery.noConflict();
  return window.jQuery;
}
module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;
}());


(function() {
  (function($) {
    return $.imgload = function(url, callback) {
      var img;
      img = new Image();
      img.src = url;
      img.onload = function() {
        callback(url);
      };
    };
  })(jQuery);

  (function() {
    return this.onimgload = function(url, fn) {
      var img, info;
      img = new Image();
      img.src = url;
      info = {
        url: url,
        height: img.height,
        width: img.width,
        ratio: img.width / img.height
      };
      img.onload = function() {
        return fn(info);
      };
      return info;
    };
  })();

}).call(this);

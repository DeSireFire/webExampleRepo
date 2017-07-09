(function() {
  (function($) {
    $.scrolla = function() {
      var $window, animate, scroll;
      $.scrolla.queues = [];
      $window = $(window);
      scroll = {
        top: 0
      };
      animate = function() {
        var i, len, queue, ref, ref1;
        ref = $.scrolla.queues;
        for (i = 0, len = ref.length; i < len; i++) {
          queue = ref[i];
          if (!queue.animateOnce) {
            if (!queue.isInitialized) {
              queue.animation(0);
              queue.isInitialized = true;
            }
            queue.end = queue.start + queue.duration;
            if ((queue.start <= (ref1 = scroll.top) && ref1 <= queue.end)) {
              queue.animation($.scrolla.map(scroll.top - queue.start, 0, queue.duration, 0, 1));
              queue.isAnimating = true;
            } else if (scroll.top <= queue.start && queue.isAnimating) {
              queue.animation(0);
              queue.isAnimating = false;
            } else if (scroll.top >= queue.end && queue.isAnimating) {
              queue.animation(1);
              queue.isAnimating = false;
            }
          } else {
            if (scroll.top >= queue.start) {
              if (!queue.isAnimated) {
                queue.isAnimated = true;
                queue.animation();
              }
            }
          }
        }
      };
      return $window.on('load scroll', function() {
        scroll.top = $window.scrollTop();
        window.requestAnimationFrame(animate);
      });
    };
    $.scrolla.map = function(iv, imin, imax, min, max) {
      var r;
      r = iv / (imax - imin) * (max - min) + min;
      if (r === void 0) {
        return 0;
      } else {
        return r;
      }
    };
    return $.scrolla.animate = function(options, animation) {
      if (!options.animateOnce) {
        $.scrolla.queues.push({
          animateOnce: false,
          animation: animation,
          duration: options.duration,
          isAnimating: false,
          isInitialized: false,
          start: options.start
        });
      } else {
        $.scrolla.queues.push({
          animateOnce: true,
          animation: animation,
          isAnimated: false,
          start: options.start
        });
      }
    };
  })(jQuery);

}).call(this);

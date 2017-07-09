(function() {
  (function($) {
    $.fn.popover = function(options, open_callback, close_callback) {
      var $current_hitzone, $current_popover, $document, $hitzones, $popovers, $window, align_popover, current_hitzone, current_popover, direction, height, hitzone_active, initialize, mouse_x, mouse_y, mousemove_handler, placement, scroll_x, scroll_y, settings, update, update_alignment, width;
      settings = $.extend({
        popovers: ".popover",
        offset: 10,
        direction: "bottom",
        placement: "right",
        show: function(this_popover) {
          this_popover.stop().fadeIn(200);
        },
        hide: function(this_popover) {
          this_popover.stop().fadeOut(200);
        }
      }, options);
      $window = $(window);
      $document = $(document);
      scroll_x = $window.scrollLeft();
      scroll_y = $window.scrollTop();
      width = $window.width();
      height = $window.height();
      mouse_x = 0;
      mouse_y = 0;
      $hitzones = this;
      $current_hitzone = void 0;
      current_hitzone = void 0;
      $popovers = $(settings.popovers);
      $current_popover = void 0;
      current_popover = void 0;
      direction = void 0;
      placement = void 0;
      initialize = void 0;
      update = void 0;
      update_alignment = void 0;
      align_popover = void 0;
      hitzone_active = false;
      initialize = function() {
        open_callback = function() {};
        close_callback = function() {};
        $popovers.hide();
        $popovers.css({
          marginLeft: 0,
          position: "fixed"
        });
      };
      update = function(this_hitzone) {
        $current_hitzone = $(this_hitzone);
        current_hitzone = {
          target: $current_hitzone.data("target"),
          direction: $current_hitzone.data("direction") || settings.direction,
          placement: $current_hitzone.data("placement") || settings.placement,
          offset: $current_hitzone.data("offset") || settings.offset
        };
        $current_popover = $popovers.filter("#" + current_hitzone.target);
        current_popover = {
          width: $current_popover.outerWidth(),
          height: $current_popover.outerHeight()
        };
      };
      update_alignment = function() {
        placement = {
          left: {
            marginLeft: -current_popover.width,
            left: mouse_x - current_hitzone.offset
          },
          right: {
            marginLeft: 0,
            left: mouse_x + current_hitzone.offset
          },
          middle: {
            marginLeft: -(current_popover.width / 2),
            left: mouse_x
          }
        };
        direction = {
          top: {
            top: mouse_y - current_popover.height - (current_hitzone.offset * 2)
          },
          bottom: {
            top: mouse_y + (current_hitzone.offset * 2)
          }
        };
      };
      align_popover = function() {
        if (current_hitzone.placement === "left") {
          $current_popover.css(placement.left);
        } else if (current_hitzone.placement === "middle") {
          $current_popover.css(placement.middle);
        } else {
          if (current_hitzone.placement === "right") {
            $current_popover.css(placement.right);
          }
        }
        if (current_hitzone.direction === "top") {
          $current_popover.css(direction.top);
        } else {
          $current_popover.css(direction.bottom);
        }
        if (mouse_x - current_popover.width < 0 && mouse_x + current_popover.width > width) {
          $current_popover.css(placement.middle);
        } else if (mouse_x + current_popover.width > width) {
          $current_popover.css(placement.left);
        } else {
          if (mouse_x - current_popover.width < 0) {
            $current_popover.css(placement.right);
          }
        }
        if (mouse_y + current_popover.height > height) {
          $current_popover.css(direction.top);
        } else {
          if (mouse_y - current_popover.height < 0) {
            $current_popover.css(direction.bottom);
          }
        }
      };
      $hitzones.on("mouseenter", function() {
        update(this);
        update_alignment();
        align_popover();
        settings.show($current_popover);
        hitzone_active = true;
        open_callback();
      }).on("mouseleave", function() {
        settings.hide($current_popover);
        hitzone_active = false;
        close_callback();
      });
      mousemove_handler = function() {
        if (hitzone_active) {
          update_alignment();
          window.requestAnimationFrame(align_popover);
        }
      };
      $document.on("mousemove", function(event) {
        mouse_x = event.pageX - scroll_x;
        mouse_y = event.pageY - scroll_y;
        mousemove_handler(event);
      });
      $(function() {
        initialize();
      });
      $window.on("load scroll", function() {
        scroll_x = $window.scrollLeft();
        scroll_y = $window.scrollTop();
      });
      $window.on("load resize", function() {
        width = $window.width();
        height = $window.height();
      });
    };
  })(jQuery);

}).call(this);

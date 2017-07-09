(function() {
  (function($) {
    $.fn.popup = function(options, open_callback, close_callback) {
      var $align_tip_to, $buttons, $current_button, $current_popup, $current_tip, $document, $popups, $tips, $window, align_popup, align_tip_to, close_popup_handler, current_button, current_popup, current_tip, height, initialize, open_popup_handler, popup_active, popup_first_time_active, scroll_left, scroll_top, settings, update, width;
      settings = $.extend({
        popups: '.popup',
        direction: 'bottom',
        placement: 0,
        offset: 0,
        tip: '.popup-tip',
        tip_offset: 0,
        align_tip_to: '.caret',
        before_open: function() {},
        open: function(popup) {
          popup.stop().fadeIn(100);
        },
        close: function(popup) {
          return popup.stop().fadeOut(100);
        }
      }, options);
      $window = $(window);
      $document = $(document);
      width = $window.width();
      height = $window.height();
      scroll_top = $window.scrollTop();
      scroll_left = $window.scrollLeft();
      $buttons = this;
      $popups = $(settings.popups);
      $tips = $(settings.tips);
      $align_tip_to = void 0;
      $current_button = void 0;
      $current_popup = void 0;
      $current_tip = void 0;
      current_button = void 0;
      current_popup = void 0;
      current_tip = void 0;
      align_tip_to = void 0;
      initialize = void 0;
      update = void 0;
      align_popup = void 0;
      open_popup_handler = void 0;
      close_popup_handler = void 0;
      popup_active = false;
      popup_first_time_active = false;
      initialize = function() {
        var default_css;
        open_callback = function() {};
        close_callback = function() {};
        default_css = {
          marginLeft: 0,
          marginTop: 0,
          position: 'absolute',
          display: 'none'
        };
        $tips.css(default_css);
        $popups.css(default_css);
      };
      update = function(this_button) {
        $current_button = this_button;
        current_button = {
          width: $current_button.outerWidth(),
          height: $current_button.outerHeight(),
          offset: $current_button.offset(),
          target: $current_button.data('target'),
          placement: $current_button.data('placement'),
          direction: $current_button.data('direction'),
          custom_offset: $current_button.data('offset')
        };
        $current_popup = $popups.filter('#' + current_button.target);
        current_popup = {
          width: $current_popup.outerWidth(),
          height: $current_popup.outerHeight(),
          left: 0,
          right: 0,
          margin_left: 0,
          margin_top: 0
        };
        $current_tip = $current_popup.find(settings.tip);
        current_tip = {
          width: $current_tip.outerWidth(),
          height: $current_tip.outerHeight(),
          margin_left: 0,
          margin_top: 0,
          left: 0,
          top: 0
        };
        $align_tip_to = $current_button.find(settings.align_tip_to);
        return align_tip_to = {
          width: $align_tip_to.outerWidth() || current_button.width,
          height: $align_tip_to.outerHeight() || current_button.height,
          offset: $align_tip_to.offset() || current_button.offset
        };
      };
      align_popup = function() {
        var direction, offset, placement;
        direction = current_button.direction || settings.direction;
        placement = (current_button.placement !== (null || undefined) ? current_button.placement : settings.placement);
        offset = (current_button.custom_offset !== (null || undefined) ? current_button.custom_offset : settings.offset);
        current_popup.left = current_button.offset.left;
        current_popup.top = current_button.offset.top;
        current_tip.left = align_tip_to.offset.left;
        current_tip.top = align_tip_to.offset.top;
        if (direction === 'left' || direction === 'right') {
          if (placement === -1) {
            current_popup.margin_top = -current_popup.height;
            current_popup.top += current_button.height;
          } else if (placement === 0) {
            current_popup.margin_top = -current_popup.height / 2;
            current_popup.top += current_button.height / 2;
          } else {
            if (placement === 1) {
              current_popup.margin_top = 0;
            }
          }
          if (direction === 'left') {
            current_popup.margin_left = -current_popup.width - offset;
            current_tip.left = current_popup.width;
          } else if (direction === 'right') {
            current_popup.left += current_button.width + offset;
            current_tip.left = -current_tip.width;
          }
          current_tip.margin_top = -current_tip.height / 2;
          current_tip.top -= current_popup.top + current_popup.margin_top - align_tip_to.height / 2;
        } else if (direction === 'top' || direction === 'bottom') {
          if (placement === -1) {
            current_popup.left += current_button.width;
            current_popup.margin_left = -current_popup.width;
          } else if (placement === 0) {
            current_popup.left += current_button.width / 2;
            current_popup.margin_left = -current_popup.width / 2;
          } else {
            if (placement === 1) {
              current_popup.margin_left = 0;
            }
          }
          if (direction === 'top') {
            current_popup.margin_top = -current_popup.height - offset;
            current_tip.top = current_popup.height;
          } else if (direction === 'bottom') {
            current_popup.top += current_button.height + offset;
            current_tip.top = -current_tip.height;
          }
          current_tip.margin_left = -current_tip.width / 2;
          current_tip.left -= current_popup.left + current_popup.margin_left - align_tip_to.width / 2;
        }
        $current_tip.css({
          marginLeft: current_tip.margin_left,
          marginTop: current_tip.margin_top,
          left: current_tip.left,
          top: current_tip.top
        });
        $current_popup.css({
          marginLeft: current_popup.margin_left,
          marginTop: current_popup.margin_top,
          left: current_popup.left,
          top: current_popup.top
        });
      };
      close_popup_handler = function() {
        if (popup_first_time_active) {
          popup_first_time_active = false;
        } else {
          if (popup_active) {
            popup_active = false;
            settings.close($current_popup);
            close_callback();
          }
        }
      };
      open_popup_handler = function(event) {
        var $this_button;
        event.preventDefault();
        $this_button = $(this);
        if (!popup_active || $this_button[0] !== $current_button[0]) {
          popup_first_time_active = true;
          $popups.hide();
          update($this_button);
          align_popup();
          settings.open($current_popup);
          popup_active = true;
          open_callback();
        }
      };
      $(function() {
        initialize();
      });
      $buttons.on('click', open_popup_handler);
      $document.on('click', function(event) {
        if (!$(event.target).closest(settings.popups).length) {
          close_popup_handler();
        }
      });
      $buttons.on('close_popup', close_popup_handler);
      $window.on('close_popups', function() {
        return close_popup_handler;
      });
      $window.on('scroll', function() {
        scroll_top = $window.scrollTop();
        scroll_left = $window.scrollLeft();
      });
      $window.on('resize', function() {
        width = $window.width();
        height = $window.height();
        $window.trigger('close_popups');
      });
      return this;
    };
  })(jQuery);

}).call(this);

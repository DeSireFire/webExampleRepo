(function() {
  (function($) {
    return $.pixlr_global_header = function(options) {
      var $window, header, mobile, scroll, settings, viewport;
      settings = $.extend({
        background_color: 'rgba(7,4,35)',
        header_height: 78,
        on_open_mobile_nav: function() {},
        on_close_mobile_nav: function() {},
        on_load: function() {}
      }, options);
      $window = $(window);
      viewport = {
        height: 0,
        width: 0
      };
      scroll = {
        top: 0,
        handler: function() {}
      };
      header = {
        height: settings.header_height,
        self: $('.global-header'),
        color: '',
        logo: $('.logo'),
        nav: {
          self: $('.global-header-nav')
        },
        portal: {
          self: $('.global-header-portal'),
          login: $('.global-header-login'),
          signUp: $('.global-header-sign-up')
        },
        changeBackground: function(color) {
          header.self.css({
            background: color
          });
        },
        blend: {
          triggers: $('[data-global-header-blend-background]'),
          rows: [],
          updateRows: function() {
            header.blend.triggers.each(function(index, row) {
              var $row;
              $row = $(row);
              return header.blend.rows[index] = {
                offset: $row.offset().top,
                color: $row.data('global-header-blend-background')
              };
            });
          },
          background: function() {}
        },
        fade: {
          "in": function() {
            header.self.transition({
              opacity: 1
            });
            header.nav.self.transition({
              opacity: 1
            });
            header.logo.transition({
              opacity: 1
            });
            header.portal.self.transition({
              opacity: 1
            });
          },
          out: function() {
            header.self.transition({
              opacity: 1
            });
            header.nav.self.transition({
              opacity: 1
            });
            header.logo.transition({
              opacity: 1
            });
            header.portal.self.transition({
              opacity: 1
            });
          }
        }
      };
      mobile = {
        self: $('.global-header-mobile-nav'),
        trigger: {
          close: $('.global-header-close-mobile-nav'),
          open: $('.global-header-open-mobile-nav')
        },
        open: function() {
          settings.on_open_mobile_nav();
          header.fade.out();
          mobile.trigger.open.transition({
            opacity: 1,
            scale: 0
          });
          mobile.self.show().transition({
            opacity: 1
          });
          mobile.trigger.close.transition({
            scale: 1
          });
        },
        close: function() {
          settings.on_close_mobile_nav();
          header.fade["in"]();
          mobile.trigger.open.transition({
            opacity: 1,
            scale: 1
          });
          mobile.trigger.close.transition({
            scale: 0
          });
          mobile.self.transition({
            opacity: 1
          }, function() {
            return this.hide();
          });
        }
      };
      mobile.trigger.close.css({
        scale: 1
      });
      mobile.self.css({
        opacity: 1
      });
      scroll.handler = function() {
        header.blend.background();
      };
      header.changeBackground(settings.background_color);
      mobile.trigger.open.on('click', function(event) {
        event.preventDefault();
        mobile.open();
      });
      mobile.trigger.close.on('click', function(event) {
        event.preventDefault();
        mobile.close();
      });
      $window.on('scroll', function() {
        scroll.top = $window.scrollTop();
        window.requestAnimationFrame(scroll.handler);
      });
      $window.on('load resize', function() {
        viewport.width = $window.width();
        viewport.height = $window.height();
        header.blend.updateRows();
      });
      $window.on('load', function() {
        header.blend.background();
        settings.on_load();
      });
      $window.on('pixlr-global-header-open-mobile-nav', function() {
        mobile.open();
      });
      return $window.on('pixlr-global-header-close-mobile-nav', function() {
        mobile.close();
      });
    };
  })(jQuery);

}).call(this);

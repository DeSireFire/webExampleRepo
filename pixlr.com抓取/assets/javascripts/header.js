(function() {
  var $document, $html, $window, modal, oxygen, scroll, viewport, wrapper;

  $window = $(window);

  $document = $(document);

  $html = $('html, body');

  scroll = {
    top: 0
  };

  viewport = {
    width: $window.width(),
    height: $window.height()
  };

  modal = {
    self: $('.modal'),
    state: {
      close: {
        opacity: 0,
        y: 200
      },
      open: {
        opacity: 1,
        y: 0
      }
    }
  };

  wrapper = {
    self: $('#wrapper'),
    scroll: {
      top: 0,
      disable: function() {
        wrapper.scroll.top = scroll.top;
        wrapper.self.css({
          height: '100%',
          overflow: 'hidden',
          position: 'fixed',
          width: '100%'
        });
        wrapper.self.scrollTop(wrapper.scroll.top);
      },
      enable: function() {
        wrapper.self.css({
          height: 'auto',
          overflow: 'auto',
          position: 'relative'
        });
        $document.scrollTop(wrapper.scroll.top);
      }
    }
  };

  oxygen = {
    load_iframe: function(_modal, trigger) {
      var iframe;
      if (trigger.data('url') != null) {
        iframe = _modal.find('iframe');
        iframe.attr('src', trigger.data('url'));
      }
      if ((trigger.data('callback') != null) && (window['Pixlr'] != null)) {
        window['Pixlr'][trigger.data('callback')]();
      }
    }
  };

  $window.on('scroll', function() {
    return scroll.top = $window.scrollTop();
  });

  $window.on('load resize', function() {
    viewport.width = $window.width();
    return viewport.height = $window.height();
  });

  $.pixlr_global_header({
    background_color: 'rgba(7,4,35)',
    on_open_mobile_nav: function() {
      return wrapper.scroll.disable();
    },
    on_close_mobile_nav: function() {
      return wrapper.scroll.enable();
    }
  });

  $('[data-toggle=popup]').popup({
    align_tip_to: '.icon-caret',
    offset: -8,
    direction: 'bottom',
    open: function(popup) {
      popup.css({
        x: 0,
        y: -10,
        opacity: 0,
        display: 'none'
      });
      popup.stop().show().transition({
        y: 0,
        opacity: 1
      }, 200);
    },
    close: function(popup) {
      return popup.stop().transition({
        x: 0,
        y: -10,
        opacity: 0
      }, 100, function() {
        $(this).hide();
      });
    }
  });

}).call(this);

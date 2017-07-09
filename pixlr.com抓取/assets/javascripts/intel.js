(function() {
  var $window, hscale, modulate, popup, previewSelector, st, vh, vw, wscale;

  modulate = function(n, from, to, limit) {
    var delta;
    limit = typeof limit === "boolean" ? limit : false;
    if (typeof from === "number") {
      from = [0, from];
    }
    if (typeof to === "number") {
      to = [0, to];
    }
    delta = from[1] - from[0];
    if (delta === (n = (n - from[0]) / delta * (to[1] - to[0]) + to[0])) {
      delta = 1;
    }
    if (limit === true) {
      if (n > to[1]) {
        n = to[1];
      }
      if (n < to[0]) {
        n = to[0];
      }
    }
    return n;
  };

  $window = $(window);

  vw = 0;

  vh = 0;

  st = 0;

  hscale = function(w, h, nh) {
    var r;
    r = w / h;
    return nh * r;
  };

  wscale = function(w, h, nw) {
    var r;
    r = h / w;
    return nw * r;
  };

  popup = {
    $overlay: void 0,
    active: false,
    close: function(callback) {
      var $popups;
      $popups = $("[data-role='intel-popup']");
      $popups.removeClass('-active');
      return this.$overlay.transition({
        opacity: 0
      }, 750, (function(_this) {
        return function() {
          _this.$overlay.removeClass('-active');
          _this.active = false;
          if (typeof callback !== 'undefined') {
            return callback();
          }
        };
      })(this));
    },
    open: function(target) {
      var open;
      open = (function(_this) {
        return function() {
          var $target;
          $target = $("[data-role='intel-popup'][data-id='" + target + "']");
          $target.addClass('-active');
          _this.$overlay.addClass('-active');
          return _this.$overlay.transition({
            opacity: 1
          }, 750, function() {
            return _this.active = true;
          });
        };
      })(this);
      if (this.active) {
        return close(open);
      } else {
        return open();
      }
    },
    clickHandler: function(event) {
      var $this, ctx, target;
      event.preventDefault();
      ctx = event.data;
      $this = $(this);
      target = $this.data('target');
      return ctx.open(target);
    },
    initialize: function() {
      var $trigger, ctx;
      this.$overlay = $('#pixlr-intel .overlay');
      $trigger = $("[data-role='intel-popup-trigger']");
      ctx = this;
      $trigger.on('click', ctx, this.clickHandler);
      $('.intel-popup-close').on('click', this.close);
      return $(document).on('click', ctx, function(event) {
        if (event.data.active) {
          if (!$(event.target).closest('.intel-popup').length) {
            return event.data.close();
          }
        }
      });
    }
  };

  previewSelector = {
    $images: void 0,
    $thumbnails: void 0,
    clickHandler: function(event) {
      var $currentActive, $images, $target, $this, $thumbnails, id, target;
      event.preventDefault();
      $this = $(this);
      id = $this.data('preview');
      target = $this.data('target');
      $thumbnails = $("[data-role='preview-selector'][data-preview='" + id + "']");
      if (!$this.hasClass('-active')) {
        $target = $("[data-role='preview-selections'][data-id='" + id + "'] > img[data-id='" + target + "']");
        $target.addClass('-stage');
        $currentActive = $("[data-role='preview-selections'][data-id='" + id + "'] > img.-active");
        $images = $("[data-role='preview-selections'][data-id='" + id + "'] > img[data-role='preview-selection']");
        $thumbnails.removeClass('-active');
        $this.addClass('-active');
        return $currentActive.transition({
          opacity: 0
        }, function() {
          $currentActive.removeClass('-active');
          $target.removeClass('-stage');
          $target.addClass('-active');
          return $images.css({
            opacity: 1
          });
        });
      }
    },
    initialize: function() {
      this.$thumbnails = $("[data-role='preview-selector']");
      return this.$thumbnails.on('click', this, this.clickHandler);
    }
  };

  $(function() {
    var $popups, fbf, resizeHandler, scalePreview, scrollHandler, sya;
    sya = {
      preview: $('.row.-preview.-sya'),
      h2: $('.row.-preview.-sya h2.-bottom'),
      background: {
        top: $('.row.-preview.-sya > .background.-top'),
        topImage: $('.row.-preview.-sya > .background.-top > img'),
        bottom: $('.row.-preview.-sya > .background.-bottom'),
        bottomImages: $('.row.-preview.-sya > .background.-bottom img')
      },
      previewSelectors: {
        active: false,
        ps: $('.row.-preview.-sya > .preview-selectors'),
        boy: $('.row.-preview.-sya > .preview-selectors .boy'),
        p: $('.row.-preview.-sya > .preview-selectors p'),
        ul: $('.row.-preview.-sya > .preview-selectors ul')
      }
    };
    fbf = {
      preview: $('.row.-preview.-fbf'),
      h2: $('.row.-preview.-fbf h2.-bottom'),
      background: $('.row.-preview.-fbf .background'),
      previewSelectors: {
        active: false,
        ps: $('.row.-preview.-fbf > .preview-selectors'),
        boy: $('.row.-preview.-fbf > .preview-selectors .boy'),
        boyOriginal: $('.row.-preview.-fbf > .preview-selectors .boy .original'),
        p: $('.row.-preview.-fbf > .preview-selectors p'),
        ul: $('.row.-preview.-fbf > .preview-selectors ul')
      }
    };
    popup.initialize();
    previewSelector.initialize();
    scalePreview = function() {
      var nh, nw, previewHeight, scale, scalei;
      nh = vh - 200;
      nw = hscale(1280, 720, nh);
      if (nw < vw) {
        nw = vw;
        nh = wscale(1280, 720, nw);
      }
      scale = {
        height: nh,
        marginLeft: -nw / 2,
        width: nw
      };
      scalei = {
        height: nh,
        width: nw
      };
      previewHeight = {
        height: vh * 2
      };
      sya.preview.css(previewHeight);
      sya.h2.css({
        top: vh + (72 + 40)
      });
      fbf.preview.css(previewHeight);
      fbf.h2.css({
        top: vh + (72 + 40)
      });
      sya.background.top.css(scale);
      sya.background.bottom.css(scale);
      sya.background.bottomImages.css(scalei);
      sya.background.bottom.css({
        top: vh
      });
      return fbf.background.css(scale);
    };
    scrollHandler = function() {
      st = $window.scrollTop();
      if (st >= vh) {
        sya.previewSelectors.ps.css({
          position: 'absolute'
        });
      }
      if (st >= vh / 3) {
        if (!sya.previewSelectors.active) {
          sya.previewSelectors.active = true;
          sya.previewSelectors.p.transition({
            y: 0
          });
          sya.previewSelectors.ul.transition({
            y: 0
          });
        }
      }
      if (st <= vh) {
        sya.previewSelectors.ps.css({
          position: 'fixed'
        });
        sya.background.topImage.css({
          y: st
        });
      }
      if (st < vh / 3) {
        if (sya.previewSelectors.active) {
          sya.previewSelectors.active = false;
          sya.previewSelectors.p.transition({
            y: 200
          });
          sya.previewSelectors.ul.transition({
            y: 200
          });
        }
      }
      if (st + vh >= (vh * 2)) {
        fbf.previewSelectors.ps.css({
          position: 'absolute',
          bottom: vh
        });
        fbf.background.css({
          top: 0,
          position: 'absolute'
        });
      }
      if (st + vh >= (vh * 3) && st + vh <= (vh * 4)) {
        fbf.previewSelectors.ps.css({
          position: 'fixed',
          bottom: 0
        });
        fbf.background.css({
          position: 'fixed'
        });
        fbf.previewSelectors.boyOriginal.css({
          opacity: modulate(st, [vh * 2 + 200, vh * 3 + 200], [1, 0])
        });
      }
      if (st + vh > (vh * 3) + vh / 3) {
        if (!fbf.previewSelectors.active) {
          fbf.previewSelectors.active = true;
          fbf.previewSelectors.p.transition({
            y: 0
          });
          fbf.previewSelectors.ul.transition({
            y: 0
          });
        }
      }
      if (st + vh <= (vh * 3) + vh / 3) {
        if (fbf.previewSelectors.active) {
          fbf.previewSelectors.active = false;
          fbf.previewSelectors.p.transition({
            y: 200
          });
          fbf.previewSelectors.ul.transition({
            y: 200
          });
        }
      }
      if (st + vh >= (vh * 4)) {
        fbf.previewSelectors.ps.css({
          position: 'absolute',
          bottom: 0
        });
        return fbf.background.css({
          top: vh,
          position: 'absolute'
        });
      }
    };
    $popups = $('.intel-popup');
    resizeHandler = function() {
      var $popup, height, i, len, results, width;
      vw = $window.width();
      vh = $window.height();
      scalePreview();
      scrollHandler();
      results = [];
      for (i = 0, len = $popups.length; i < len; i++) {
        popup = $popups[i];
        $popup = $(popup);
        height = $popup.outerHeight();
        width = $popup.outerWidth();
        results.push($popup.css({
          marginLeft: -width / 2,
          marginTop: -height / 2
        }));
      }
      return results;
    };
    fbf.previewSelectors.p.css({
      y: 200
    });
    fbf.previewSelectors.ul.css({
      y: 200
    });
    sya.previewSelectors.p.css({
      y: 200
    });
    sya.previewSelectors.ul.css({
      y: 200
    });
    $window.on('load resize', resizeHandler);
    return $window.on('scroll', scrollHandler);
  });

}).call(this);

(function() {
  var instagram, loadFromTumblr, tumblr, updateImages;

  this.Utils = {
    isLoaded: false,
    ajax: function(option) {
      var _timeout, dothis, request;
      _timeout = void 0;
      this.jsonpCallback = function(data) {
        clearTimeout(_timeout);
        return option.success(data);
      };
      option.timeout = typeof option.timeout === 'number' ? option.timeout / 1000 : 1000;
      if (option.dataType !== 'jsonp') {
        request = new XMLHttpRequest();
        request.open(option.method, option.url, true);
        if (option.method === 'POST') {
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        request.onload = function() {
          var resp;
          if (request.status >= 200 && request.status < 400) {
            resp = request.responseText;
            return option.success(resp);
          } else {
            return option.error();
          }
        };
        request.onerror = function() {
          return option.connection_error();
        };
        return request.send(option.data);
      } else {
        dothis = (function(_this) {
          return function() {
            var script, src;
            src = option.url + "&callback=Utils.jsonpCallback";
            script = document.createElement('SCRIPT');
            script.src = src;
            document.body.appendChild(script);
            return _timeout = setTimeout(option.error, option.timeout);
          };
        })(this);
        window.onload = function() {
          Utils.isLoaded = true;
          return dothis();
        };
        if (Utils.isLoaded) {
          return dothis();
        }
      }
    }
  };

  tumblr = {
    api_key: 'LdOJ9rPFna91tcVzTuzpGHFxAJEOntdPb5S45Ys7K6V8xDt0ZP',
    blog: 'pixlrblog.tumblr.com',
    offset: 0,
    loaded: false,
    images: [],
    update: function() {
      return this.url = "https://api.tumblr.com/v2/blog/" + this.blog + "/posts/photo?offset=" + this.offset + "&api_key=" + this.api_key;
    }
  };

  instagram = {
    user_id: "986832632",
    client_id: "7bbe1b77920a48089c364af7906eaa6f",
    loaded: false,
    images: [],
    update: function() {
      return this.url = "https://api.instagram.com/v1/users/" + this.user_id + "/media/recent/?client_id=" + this.client_id;
    }
  };

  instagram.update();

  updateImages = function(from) {
    var a, i, img, j, results;
    results = [];
    for (i = j = 0; j <= 9; i = ++j) {
      img = document.querySelector(".gallery-image-" + i + " img");
      a = document.querySelector(".gallery-image-" + i + " a");
      if (from === "instagram") {
        img.src = instagram.images[i][0];
        results.push(a.href = instagram.images[i][1]);
      } else if (from === "tumblr") {
        img.src = tumblr.images[i][0];
        results.push(a.href = tumblr.images[i][1]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  loadFromTumblr = function() {
    tumblr.update();
    return Utils.ajax({
      url: tumblr.url,
      method: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        var index, j, k, len, len1, photo, post, ref, ref1;
        ref = data.response.posts;
        for (index = j = 0, len = ref.length; j < len; index = ++j) {
          post = ref[index];
          ref1 = post.photos;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            photo = ref1[k];
            tumblr.images[index] = [];
            tumblr.images[index][0] = photo.original_size.url;
            tumblr.images[index][1] = post.post_url;
          }
        }
        tumblr.loaded = true;
        return updateImages("tumblr");
      }
    });
  };

  Utils.ajax({
    url: instagram.url,
    method: 'GET',
    dataType: 'jsonp',
    success: function(response) {
      var data, index, j, len, ref;
      ref = response.data;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        data = ref[index];
        instagram.images[index] = [];
        instagram.images[index][0] = data.images.standard_resolution.url;
        instagram.images[index][1] = data.link;
      }
      instagram.loaded = true;
      return updateImages("instagram");
    },
    error: function() {
      return loadFromTumblr();
    }
  });

  $(function() {
    var $html, $window, gallery, hero, pixlr, sin_deg, to_radians, viewport;
    $window = $(window);
    $html = $('html, body');
    viewport = {
      height: $window.height(),
      width: $window.width()
    };
    hero = {
      background: $('.hero-background'),
      heading: {
        self: $('.hero-heading'),
        icon: $('.hero-pixlr-icon'),
        h1: $('.hero-heading h1'),
        p: $('.hero-heading p')
      },
      arrow: $('.hero-arrow')
    };
    pixlr = {
      gutter: 40,
      editor: {
        self: $('#pixlr-home .pixlr-editor'),
        butterfly: {
          left: $('.butterfly-left'),
          right: $('.butterfly-right')
        },
        prop_0: {
          self: $('#pixlr-home .pixlr-editor .prop-0'),
          height: 548,
          width: 71
        },
        prop_1: {
          self: $('.pixlr-editor .prop-1'),
          height: 159,
          width: 227
        },
        prop_2: {
          self: $('.pixlr-editor .prop-2'),
          height: 159,
          width: 227
        }
      },
      express: {
        self: $('.pixlr-express'),
        birds: {
          top: $('.birds-top'),
          middle: $('.birds-middle'),
          bottom: $('.birds-bottom')
        },
        prop_0: {
          self: $('.pixlr-express .prop-0'),
          height: 144,
          width: 512
        },
        prop_1: {
          self: $('.pixlr-express .prop-1'),
          height: 70,
          width: 512
        }
      },
      mobile: {
        self: $('.pixlr-mobile'),
        prop_0: {
          self: $('.pixlr-mobile .prop-0')
        }
      },
      desktop: {
        self: $('.pixlr-desktop')
      }
    };
    gallery = {
      image_0: $('.gallery-image-0'),
      image_1: $('.gallery-image-1'),
      image_2: $('.gallery-image-2'),
      image_3: $('.gallery-image-3'),
      image_4: $('.gallery-image-4'),
      image_5: $('.gallery-image-5'),
      image_6: $('.gallery-image-6'),
      image_7: $('.gallery-image-7'),
      image_8: $('.gallery-image-8'),
      image_9: $('.gallery-image-9')
    };
    to_radians = function(deg) {
      return deg * Math.PI / 180;
    };
    sin_deg = function(deg) {
      return Math.sin(to_radians(deg)).toFixed(15);
    };
    $.scrolla();
    $.scrolla.animate({
      start: 0,
      duration: 1280
    }, function(n) {
      hero.background.css({
        y: n * -256,
        opacity: 1 - n
      });
    });
    $.scrolla.animate({
      start: 0,
      duration: 768
    }, function(n) {
      hero.arrow.css({
        opacity: 1 - n,
        scale: 1 - n
      });
      hero.heading.self.css({
        y: n * -320,
        opacity: 1 - n
      });
    });
    pixlr.editor.butterfly.left.css({
      perspective: '750px',
      transformOrigin: '64px 64px',
      rotateY: 0,
      scale: 0.25,
      opacity: 0
    });
    pixlr.editor.butterfly.right.css({
      perspective: '750px',
      transformOrigin: '0px 64px',
      rotateY: 0,
      scale: 0.25,
      opacity: 0
    });
    $.scrolla.animate({
      start: 320,
      duration: 768 + 640
    }, function(n) {
      var op_normal_n, opn, scale_n, sn, un;
      sn = sin_deg(n * 180);
      un = $.scrolla.map(n, 0, 1, -0.5, 1);
      pixlr.editor.self.css({
        y: un * 256,
        opacity: sn
      });
      pixlr.express.self.css({
        y: un * 128,
        opacity: sn
      });
      sn = Math.abs(sin_deg(n * 800));
      opn = $.scrolla.map(sn, 0, 1, 1, 0.5);
      op_normal_n = sin_deg(n * 180);
      scale_n = sin_deg(n * 180);
      pixlr.editor.butterfly.left.css({
        y: -(n * 2) * 273,
        opacity: opn,
        rotateY: $.scrolla.map(sn, 0, 1, -45, 80) + 'deg',
        scale: $.scrolla.map(scale_n, 0, 1, 0.33, 1)
      });
      pixlr.editor.butterfly.right.css({
        y: -(n * 2) * 273,
        opacity: opn,
        rotateY: -$.scrolla.map(sn, 0, 1, -45, 80) + 'deg',
        scale: $.scrolla.map(scale_n, 0, 1, 0.33, 1)
      });
      pixlr.express.birds.top.css({
        y: -n * 60,
        x: n * 10,
        opacity: op_normal_n
      });
      pixlr.express.birds.middle.css({
        y: -n * 30,
        x: n * 20,
        opacity: op_normal_n
      });
      pixlr.express.birds.bottom.css({
        y: -n * 85,
        x: n * 25,
        opacity: op_normal_n
      });
    });
    pixlr.editor.prop_0.offset = pixlr.editor.prop_0.width + pixlr.gutter * 2;
    $.scrolla.animate({
      start: 640,
      duration: 196
    }, function(n) {
      pixlr.editor.prop_0.self.css({
        x: -n * pixlr.editor.prop_0.offset,
        opacity: n
      });
      pixlr.express.prop_0.self.css({
        x: n * pixlr.express.prop_0.width + pixlr.gutter,
        opacity: n
      });
    });
    $.scrolla.animate({
      start: 768,
      duration: 196
    }, function(n) {
      pixlr.editor.prop_1.self.css({
        x: -n * (pixlr.editor.prop_0.offset + pixlr.editor.prop_1.width + pixlr.gutter),
        opacity: n
      });
      pixlr.express.prop_1.self.css({
        x: n * pixlr.express.prop_1.width + pixlr.gutter,
        opacity: n
      });
    });
    $.scrolla.animate({
      start: 800,
      duration: 196
    }, function(n) {
      pixlr.editor.prop_2.self.css({
        x: -n * (pixlr.editor.prop_0.offset + pixlr.editor.prop_2.width + pixlr.gutter),
        opacity: n
      });
    });
    $.scrolla.animate({
      start: 768,
      duration: 768 + 300
    }, function(n) {
      gallery.image_0.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, 250, 0)
      });
      gallery.image_1.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, -130, 0)
      });
      gallery.image_2.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, 400, 0)
      });
      gallery.image_3.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, 250, 0)
      });
      gallery.image_4.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, -450, 0)
      });
      gallery.image_5.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, -50, 0)
      });
      gallery.image_6.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, -100, 0)
      });
      gallery.image_7.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, 790, 0)
      });
      gallery.image_8.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, 470, 0)
      });
      gallery.image_9.css({
        opacity: n,
        y: $.scrolla.map(n, 0, 1, 580, 0)
      });
    });
    $.scrolla.animate({
      start: 768 * 2 + 320,
      duration: 768 + 320
    }, function(n) {
      pixlr.mobile.self.css({
        y: (n * 2) * 64,
        opacity: n
      });
      pixlr.mobile.prop_0.self.css({
        y: -n * 32,
        x: -n * 16,
        opacity: n
      });
      pixlr.desktop.self.css({
        y: -n * 64,
        opacity: n
      }, 'easeOutCirc');
    });
    hero.arrow.on('click', function(event) {
      $html.stop().animate({
        scrollTop: 1020
      }, 2500, 'easeOutCirc');
    });
    return $.pixlr_global_header({
      background_color: 'rgba(7,4,35)'
    });
  });

}).call(this);

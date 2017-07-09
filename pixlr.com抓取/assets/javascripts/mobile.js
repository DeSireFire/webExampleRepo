(function() {
  var $label, currentScreen, currentSlide, nextScreen, screens, slide, slideScreen, stageScreen, stageScreens, startSlideShow;

  screens = $('.screen > .image');

  $label = $('.label > h2');

  currentScreen = 0;

  currentSlide = 0;

  nextScreen = function(n) {
    if (typeof n === 'number') {
      if (n > screens.length - 1) {
        n = 0;
      }
      return n;
    } else {
      currentScreen++;
      if (currentScreen > screens.length - 1) {
        currentScreen = 0;
      }
      return currentScreen;
    }
  };

  stageScreen = function() {
    return $(screens[nextScreen(currentScreen + 1)]).css({
      x: screenWidth
    });
  };

  stageScreens = function() {
    var i, j, len, results, screen;
    results = [];
    for (i = j = 0, len = screens.length; j < len; i = ++j) {
      screen = screens[i];
      if (i !== currentScreen) {
        results.push($(screen).css({
          x: 200
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  slideScreen = function(callback) {
    stageScreens();
    $(screens[currentScreen]).css({
      x: 0
    });
    $(screens[currentScreen]).transition({
      x: -200
    }, 500);
    currentScreen++;
    if (currentScreen > screens.length - 1) {
      currentScreen = 0;
    }
    return $(screens[currentScreen]).transition({
      x: 0
    }, function() {
      var i, j, label, len, screen;
      label = $(screens[currentScreen]).data('label');
      $label.fadeOut(function() {
        $label.html(label);
        return $label.fadeIn();
      });
      for (i = j = 0, len = screens.length; j < len; i = ++j) {
        screen = screens[i];
        if (i !== currentScreen) {
          $(screen).css({
            x: 200
          });
        }
      }
      return callback();
    });
  };

  slide = function() {
    return slideScreen(function() {
      return startSlideShow();
    });
  };

  startSlideShow = function() {
    return window.setTimeout(slide, 3000);
  };

  window.onload = function() {
    return startSlideShow();
  };

}).call(this);

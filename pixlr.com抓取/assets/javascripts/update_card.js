(function() {
  var handleCardUpdateMessage;

  $(function() {
    if (window.addEventListener) {
      return window.addEventListener('message', handleCardUpdateMessage, false);
    } else {
      return window.attachEvent('message', handleCardUpdateMessage);
    }
  });

  handleCardUpdateMessage = function(event) {
    var $ccOverlay;
    $ccOverlay = $('#cc-overlay');
    if (event.data = 'onUpdateCardSuccess') {
      return $ccOverlay.hide();
    } else if (event.data = 'onUpdateCardError') {
      if ((typeof console !== "undefined" && console !== null ? console.log : void 0) != null) {
        return console.log('error');
      }
    }
  };

}).call(this);

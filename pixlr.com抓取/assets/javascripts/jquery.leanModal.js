// leanModal v1.1 by Ray Stone - http://finelysliced.com.au
// Dual licensed under the MIT and GPL

(function($) {
  $.fn.extend({
    leanModal: function(options) {
      var defaults = {
        top: 100,
        overlay: 0.5,
        closeButton: null,
        confirmButton: null
      };

      var overlay = $("<div id='lean_overlay'></div>");
      $("body").append(overlay);

      var o = $.extend(defaults, options);
      var that = this;

      var modal_height = $(this).outerHeight();
      var modal_width = $(this).outerWidth();

      $("#lean_overlay").css({
        "display": "block",
        opacity: 0
      });

      $("#lean_overlay").fadeTo(200, o.overlay);

      $(this).css({
        "display": "block",
        "position": "fixed",
        "opacity": 0,
        "z-index": 11000,
        "left": 50 + "%",
        "margin-left": -(modal_width / 2) + "px",
        "top": o.top + "px"
      });

      $(this).fadeTo(200, 1);

      $("#lean_overlay").click(function() {
        close_modal(that);
      });

      $(o.closeButton).click(function() {
        close_modal(that);
      });

      $(o.confirmButton).click(function() {
        close_modal(that);
      });

      function close_modal(modal_id) {
        $("#lean_overlay").fadeOut(200);$(modal_id).css({
          "display": "none"
        })
      }

      return this;
    }
  })
})(jQuery);

(function() {
  (function($) {
    return $.modal = function(options) {
      var $document, modal, settings;
      settings = $.extend({
        modal: '.modal',
        overlay: '.modal-overlay',
        openTrigger: '[data-toggle=modal]',
        closeTrigger: '.modal-close',
        open: function(modal, overlay, trigger) {
          overlay.stop().fadeIn();
          modal.stop().show();
        },
        close: function(modals, overlay) {
          overlay.stop().fadeOut();
          modals.stop().hide();
        },
        transition: function(targetModal, modals, overlay, trigger) {
          modals.stop().fadeOut(function() {
            return targetModal.stop().fadeIn();
          });
        }
      }, options);
      $document = $(document);
      modal = {
        is_active: false,
        self: $(settings.modal),
        overlay: $(settings.overlay),
        trigger: {
          count: 0,
          close: $(settings.closeTrigger),
          open: $(settings.openTrigger)
        },
        transition: function(id) {
          var targetModal;
          targetModal = $(settings.modal + '#' + id);
          settings.transition(targetModal, modal.self, modal.overlay);
        },
        close: function() {
          modal.is_active = false;
          settings.close(modal.self, modal.overlay);
          $document.off('click', modal.watch);
          modal.trigger.count = 0;
        },
        open: function(id, trigger) {
          var targetModal;
          if (!modal.is_active) {
            modal.is_active = true;
            targetModal = $(settings.modal + '#' + id);
            settings.open(targetModal, modal.overlay, trigger);
            $document.on('click', modal.watch);
          } else {
            modal.transition(id, trigger);
          }
        },
        watch: function(event) {
          if (!$(event.target).closest(settings.modal).length) {
            modal.trigger.count++;
            if (modal.trigger.count === 2) {
              modal.close();
            }
          }
        }
      };
      modal.trigger.open.on('click', function(event) {
        var $trigger, id;
        event.preventDefault();
        $trigger = $(this);
        id = $trigger.data('target');
        return modal.open(id, $trigger);
      });
      modal.trigger.close.on('click', function(event) {
        event.preventDefault();
        return modal.close();
      });
      return modal;
    };
  })(jQuery);

}).call(this);

$(document).ready(function() {
  var $sidebar, $main,
      isFocused, openSlider, closeSlider;

  $sidebar = $('.sidebar');
  $main = $('.main');
  $sideHamburger = $('#sidebar-hamburger');

  isFocused = function($element) {
    return $element.css('margin-left') == '0px';
  };

  openSlider = function(e) {
    if(!isFocused($sidebar)){
      $main.css({ overflow: 'hidden' });
      $sidebar.animate({ marginLeft: '0px'} , 250);
    }
  };

  closeSlider = function(e) {
    if(isFocused($sidebar)){
      $main.css({ overflow: 'auto' });
      $sidebar.animate({ marginLeft: '-210px'} , 250);
    }
  };

  $sideHamburger.click(openSlider);
  $main.click(closeSlider);

});

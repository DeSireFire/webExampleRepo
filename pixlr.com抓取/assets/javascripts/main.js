$(document).ready(function() {
  var csrf_token, userMenuContent, productMenuContent;

  csrf_token = $('meta[name="csrf-token"]').attr('content');

  userMenuContent = $('#user-menu').clone().show();
  productMenuContent = $('#product-menu').clone().show();
  buyMenuContent = $('#buy-menu').clone().show();
  systemReq = $('#system-req-menu').clone().show();

  $('.user-menu-js').tooltipster({
    trigger: 'click',
    interactive: true,
    content: userMenuContent,
    theme: 'tooltipster-user',
    functionReady: function(origin, tooltip) {
      mixpanelTrackSub(origin, tooltip);
    }
  });

  $('.product-menu-js').tooltipster({
    trigger: 'click',
    interactive: true,
    content: $(productMenuContent),
    theme: 'tooltipster-product',
    functionReady: function(origin, tooltip) {
      mixpanelTrackSub(origin, tooltip);
    }
  });

  $('.buy-menu-js').tooltipster({
    position: 'bottom',
    trigger: 'click',
    interactive: true,
    content: $(buyMenuContent),
    theme: 'tooltipster-product',
    functionReady: function(origin, tooltip) {
      mixpanelTrackSub(origin, tooltip);
    }
  });

  $('.system-requirements-js').tooltipster({
    position: 'top',
    trigger: 'hover',
    interactive: 'false',
    content: $(systemReq),
    theme: 'tooltipster-system-req',
    functionReady: function(origin, tooltip) {
      // Issue the Mixpanel events when the hover is shown.
      mixpanelTrackImmediate(origin);
    }
  });

  var $subMenuSelector = $('.has-sub-js > a');
  var $mobileOxygen = $('.mobile-menu .oxygen-js');

  //Attach this class to any element that should trigger a dropdown menu
  var $dropMenu = $('.drop-menu');

  //Handles clicks on Drop Menu elements and checks what menu to trigger.
  //It will toggle the arrow icons on click
  $dropMenu.on('click', function(e) {
    e.preventDefault();

    if($(this).hasClass('button')){
      $(this).find('i')
      .toggleClass('icon-arrow-down')
      .toggleClass('icon-arrow-up')
    };
    var menu = '#' + $(this).data("menu");
    $(menu).slideToggle();
  });

  $mobileOxygen.on('click', function(e) {
    e.preventDefault();
    $('#mobile-nav').hide();
  });

  //Handles click event on menu items that have a submenu
  $subMenuSelector.on('click', function(e) {
    e.preventDefault();

    $(this).find('i')
    .toggleClass('icon-arrow-down')
    .toggleClass('icon-arrow-up');
    $(this).next('.submenu').slideToggle();
  });

  // Detects click on marketplace links and shows appropriate iFrame based off data attribute
  $('.oxygen-js').click(function(e) {
    e.preventDefault();

    var authType = $(this).data("mp-auth-type");
    openMarketplaceAuthOverlay('register' === authType);
  });

  $('#close-oxygen').click(function(e) {
    e.preventDefault();

    $('#overlay').hide();
    $('#oxygen iframe').attr('src', "");
    $.removeCookie("authentication_type");
  });

  $(".pixlrengage-landing").click(function(){
    showHideLandingPage('show',$(this).attr('href'));
  });

  $(".pixlrengage-landing-close, #wrapper").click(function(){
    showHideLandingPage('hide',window.location.hash);
  });

  if(window.location.hash == '#advertise' || window.location.hash == '#engage'){
    showHideLandingPage('show',window.location.hash);
  }

  function showHideLandingPage(type,pageId){
    if(type == 'show'){
      $('.content-pixlrengage-landing').show('slide', { direction: 'right' }, 500);
      $('body, html').css({"overflow":"hidden"});

      $("#mainnav > ul > li").removeClass('active');
      $(".wrapper_pixlrengage").find('a[href="' +pageId+ '"]').parent().addClass('active');
      if(pageId == '#advertise'){
        $('.wrapper_pixlrengage .header .btn-close , .wrapper_pixlrengage .wrap-advertise-pixlr').removeClass('hidden');
        $('.wrapper_pixlrengage .header .btn-back , .wrapper_pixlrengage .wrap-engage-pixlr').addClass('hidden');
      }else{
        $('.wrapper_pixlrengage .header .btn-close , .wrapper_pixlrengage .wrap-advertise-pixlr').addClass('hidden');
        $('.wrapper_pixlrengage .header .btn-back , .wrapper_pixlrengage .wrap-engage-pixlr').removeClass('hidden');
      }
    }else{
      $('body, html').css({"overflow":"auto"});
      $('.content-pixlrengage-landing').hide('slide', { direction: 'right' }, 500);
      window.location.hash = '';
    }
  }
  
  $(".content-pixlrengage-landing a.btn-more").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      $('.content-pixlrengage-landing').animate({
        scrollTop: $('#section-next').offset().top - 78
      }, 800);
    } 
  });

  $("#mainnav > ul > li").on('click', function(event) {
      $("#mainnav").find(".active").removeClass('active');
      $(this).addClass('active');
      if($(this).hasClass('mn-advertise')) {
          $('.wrapper_pixlrengage .header .btn-close , .wrapper_pixlrengage .wrap-advertise-pixlr').removeClass('hidden');
          $('.wrapper_pixlrengage .header .btn-back , .wrapper_pixlrengage .wrap-engage-pixlr').addClass('hidden');
          
      } else {
          $('.wrapper_pixlrengage .header .btn-close , .wrapper_pixlrengage .wrap-advertise-pixlr').addClass('hidden');
          $('.wrapper_pixlrengage .header .btn-back , .wrapper_pixlrengage .wrap-engage-pixlr').removeClass('hidden');
      }
  });

});

// isRegister: boolean. True, if this should open a sign-up view; false, for a sign-in view.
function openMarketplaceAuthOverlay(isRegister, showClose, title) {

  // Store the cookie of the current URL in order to be able to potentially send
  // the "first sign in" analytic for Mixpanel.
  $.cookie("authentication_request_url", window.location);
  $.cookie("authentication_type", isRegister ? 'register' : 'login');

  if ('/checkout' == window.location.pathname) {
  // Yes, I know this is evil. window.mixpanel_afc is set in sessions/new.html.erb here so that we can get the value.
  // This just needs to work. Like, right now.
    mixpanel.track('sign in screen', { 'load origin': 'buy ' + window.mixpanelPlanString,
      'afc origin': window.mixpanelAfc });
  }

  //Set defaults
  showClose = typeof showClose !== 'undefined' ? showClose : true;
  title = typeof title !== 'undefined' ? title : false;

  var $overlay = $('#overlay');

  $overlay.show();

  if (!showClose) {
    $overlay.find('#close-oxygen').hide();
  }

  if (title) {
    $overlay.find('h3').show();
    $overlay.find('h3').text(title);
  }

  var url = isRegister ? marketplaceAuthUrls.register : marketplaceAuthUrls.login;
  // main.js
  $('#oxygen iframe').attr('src', url);
}
;

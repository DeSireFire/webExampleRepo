$(document).ready(function() {

  var $showDetails = $('.show-details');

  var $showUpdate = $('#show-cc-update');
  var $ccOverlay = $('#cc-overlay');
  var $ccContainer = $('#cc-container');
  var $ccUpdateClose = $('#cc-update-close');

  var $tabs = $('ul.tabs li');
  var $tabContent = $('.tab-content');
  var $firstTabContent = $('.tab-content:first');

  var $downloadButton = $('.download-tab-js');

  $tabContent.hide();
  $firstTabContent.show();

  $tabs.click(function() {
      $tabContent.hide();
      var $activeTab = $(this).attr("rel");
      $("#" + $activeTab).show();

      $tabs.removeClass('active');
      $(this).addClass('active');
  });

  $downloadButton.click(function(){
    openTab('tab3');
    $('ul.tabs li:last-child').addClass('active');
  });

  $showDetails.click(function() {
    var $detailsDiv = $(this).parent().parent().parent().find('.purchase-details');

    $detailsDiv.toggle();
    $(this).find('.show, .hide').toggle();
  });

  $showUpdate.click(function() {

    $ccOverlay.show();
    $ccContainer.show();

  });

  $ccUpdateClose.click(function(){
    $ccOverlay.hide();
  })

  $downloadButton.click(function(){
    openTab('tab3');
  });

  function openTab(tab){
    $tabContent.hide();
    var $activeTab = $('#' + tab);
    $activeTab.show();
    $tabs.removeClass('active');
  }

});

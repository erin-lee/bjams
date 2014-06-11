$('document').ready('DOMContentLoaded', function() {
  var $heroTitle
  , subText
  , $this = $(this)
  , $sellPoint = $('.selling-points .point')
  ;

  $heroTitle = $('.hero-content h3');
  heroTitle.addEventListener('click', function() {
    subText = $this.textContent;
    $this.textContent = subText + '!';
  });
  var onHoverAction = function(e) {
    $this.style.marginTop = '10px';
  };

  var offHoverAction = function(e) {
    $this.style.marginTop = 0;
  };

  $sellPoint.hover(onHoverAction, offHoverAction);

});
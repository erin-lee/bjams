$('document').ready('DOMContentLoaded', function() {
  var heroTitle
  , subText
  , sellPoint = document.querySelectorAll('.selling-points .point');

  heroTitle = document.querySelector('.hero-content h3');
  heroTitle.addEventListener('click', function() {
    subText = this.textContent;
    this.textContent = subText + '!';
  });
  var onHoverAction = function(e) {
    this.style.marginTop = '10px';
  };

  var offHoverAction = function(e) {
    this.style.marginTop = 0;
  };

  // debugger;
  for( var x=0; x< sellPoint.length; x++) {
    sellPoint[x].addEventListener('mouseover', onHoverAction);
    sellPoint[x].addEventListener('mouseout', offHoverAction);
  }


  // sellPoint.addEventListener('mouseover', onHoverAction);
  // sellPoint.addEventListener('mouseout', offHoverAction);
});
var updateCollectionView = function() {
  var $collection = $(".collection-container .row")
  , $newThumbnail = $('#albumThumbnail').html()
  , $thumbOverlay = $('#albumOverlay').html()
  , albumThumb = Handlebars.compile($newThumbnail)
  , albumOverlay = Handlebars.compile($thumbOverlay)
  ;

  $collection.empty();
  for (var i = 0; i < 33; i++) {
    ($collection.append(albumThumb));
  };

  var onHover = function(e) {
    $(this).append(albumOverlay);
  };

  var offHover = function(e) {
    $(this).find('.collection-album-image-overlay').remove();
  }

  $collection.find('.collection-album-image-container').hover(onHover, offHover);
};

if (document.URL.match(/\/collection.html/)) {
  $(document).ready(function() {

    updateCollectionView();
  });
}
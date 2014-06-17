// Example Album
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder.png',

  songs: [
      { name: 'Hello, Operator?', length: '1:01' },
      { name: 'Ring, ring, ring', length: '5:01' },
      { name: 'Fits in your pocket', length: '3:21'},
      { name: 'Can you hear me now?', length: '3:14' },
      { name: 'Wrong phone number', length: '2:15'}
    ]
};

var currentlyPlayingSong = null;

var changeAlbumView = function(album) {
  var $songList = $('.album-song-listing')
  , songs = album.songs
  , $songRow = $('#songRow').html()
  , songRow = Handlebars.compile($songRow)
  , temp = songRow(songs)
  ;

  $songList.empty();
  $songList.append(temp);
};

var updateSeekPercentage = function($seekBar, e) {
  var barWidth = $seekBar.width();
  var offsetX = e.pageX = $seekBar.offset().left;

  var offsetXPercent = (offsetX / $seekBar.width()) * 100;
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
  $seekBars = $('.player-bar .seek-bar');
  $seekBars.click(function(e) {
    updateSeekPercentage($(this), e);
  });

  $seekBars.find('.thumb').mousedown(function(e){
    var $seekBar = $(this).parent();

    $seekBar.addClass('no-animate');

    $(document).bind('mousemove.thumb', function(e){
      updateSeekPercentage($seekBar, e);
    });

    //cleanup
    $(document).bind('mouseup.thumb', function(){
      $seekBar.removeClass('no-animate');

      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });

  });
};

var clickHandler = function(e) {
  var $this = $(this)
  , $row = $('tr')
  , icon = $row.find('.fa');

  if ( currentlyPlayingSong ) {
    $row.find('.song-number').removeClass('active')
    icon.removeClass('fa-pause')
    icon.addClass('fa-play')
    $this.addClass('active');
    $this.find('.fa').removeClass('fa-play').addClass('fa-pause');
    currentlyPlayingSong = null;
  } else {
    $this.find('.fa').removeClass('fa-pause').addClass('fa-play');
    currentlyPlayingSong = true;
  }

};

if (document.URL.match(/\/album.html/)) {
  $(document).ready(function() {
    var album = albumMarconi;

    $('.album-song-listing').on('click', '.song-number', clickHandler);

    changeAlbumView(album);
    setupSeekBars();
  });
}

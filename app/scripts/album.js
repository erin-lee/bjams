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
  });
}

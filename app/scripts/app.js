// require("./landing");
// require("./collection");
// require("./album");
// require("./profile");

// Example album.
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',

  songs: [
   { name: 'Blue', length: '4:26', audioUrl: '/music/placeholders/blue' },
   { name: 'Green', length: '3:14', audioUrl: '/music/placeholders/green' },
   { name: 'Red', length: '5:01', audioUrl: '/music/placeholders/red' },
   { name: 'Pink', length: '3:21', audioUrl: '/music/placeholders/pink' },
   { name: 'Magenta', length: '2:15', audioUrl: '/music/placeholders/magenta' }
  ]
};

var app = angular.module('blocJams', ['ui.router']);

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'LandingController',
    templateUrl: '/templates/landing.html'
  })
  .state('song', {
    url: '/song',
    // controller: 'LandingController',
    templateUrl: '/templates/song.html'
  })
  .state('collection', {
    url: '/collection',
    controller: 'CollectionController',
    templateUrl: '/templates/collection.html'
  })
  .state('album', {
    url: '/album',
    views: {
      '': {
        templateUrl: '/templates/album.html',
        controller: 'AlbumController'
      },
      'playerBar@album': { templateUrl: '/templates/player_bar.html' }
    }
  });
}]);

app.controller('LandingController', function($scope) {
  $scope.subText = "Turn the music up!";
  $scope.title = "Bloc Jams";
  $scope.subTextClicked = function() {
    return $scope.subText += '!';
  };

  $scope.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  $scope.albumUrls = [
    '/images/album-placeholders/album-1.jpg',
    '/images/album-placeholders/album-2.jpg',
    '/images/album-placeholders/album-3.jpg',
    '/images/album-placeholders/album-4.jpg',
    '/images/album-placeholders/album-5.jpg',
    '/images/album-placeholders/album-6.jpg',
    '/images/album-placeholders/album-7.jpg',
    '/images/album-placeholders/album-8.jpg',
    '/images/album-placeholders/album-9.jpg',
  ];
});

app.controller('CollectionController', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
  $scope.albums = [];

  for (var i = 0; i < 33; i++) {
    $scope.albums.push(angular.copy(albumPicasso));
  }

  $scope.playAlbum = function(album) {
    SongPlayer.setSong(album, album.songs[0]);
  }
}]);

app.controller('AlbumController', ['$scope', 'SongPlayer', 'ConsoleLogger',function($scope, SongPlayer, ConsoleLogger) {
  $scope.album = angular.copy(albumPicasso);

  var hoveredSong = null;
  var playingSong = null;

  $scope.onHoverSong = function(song) {
    hoveredSong = song;
  };

  $scope.offHoverSong = function(song) {
    hoveredSong = null;
  };

  $scope.getSongState = function(song) {
    if (song === SongPlayer.currentSong && SongPlayer.playing) {
      return 'playing';
    }
    else if (song === hoveredSong) {
      return 'hovered';
    }
    return 'default';
  };

  $scope.playSong = function(song) {
    SongPlayer.setSong($scope.album, song);
  };

  $scope.pauseSong = function(song) {
    SongPlayer.pause();
  };
  $scope.logger = ConsoleLogger;
  console.log(ConsoleLogger);
}]);

app.controller('PlayerBarController', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer, ConsoleLogger) {
  $scope.songPlayer = SongPlayer;
}]);

app.service('ConsoleLogger', function() {
  return {
    text: 'Hello World',
    log: function() {
      console.log(this.text);
    }
  }
});

app.service('SongPlayer', function(){
  var currentSoundFile = null;
  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };

  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,

    play: function() {
      this.playing = true;
      currentSoundFile.play();
    },
    pause: function() {
      this.playing = false;
      currentSoundFile.pause();
    },
    next: function() {
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
      currentTrackIndex++;
      if (currentTrackIndex >= this.currentAlbum.songs.length) {
        currentTrackIndex = 0;
      }
      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
    },
    previous: function() {
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
      currentTrackIndex--;
      if (currentTrackIndex < 0) {
        currentTrackIndex = this.currentAlbum.songs.length - 1;
      }
      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
    },
    setSong: function(album, song) {
      if (currentSoundFile) {
        currentSoundFile.stop();
      }
      this.currentAlbum = album;
      this.currentSong = song;
      currentSoundFile = new buzz.sound(song.audioUrl, {
        formats: [ "mp3" ],
        preload: true
      });

      this.play();
    }
  };
});
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
      { name: 'Blue', length: '4:26' },
      { name: 'Green', length: '3:14' },
      { name: 'Red', length: '5:01' },
      { name: 'Pink', length: '3:21'},
      { name: 'Magenta', length: '2:15'}
    ]
};

var app = angular.module('blocJams', ['ui.router']);

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'LandingController',
    templateUrl: '/templates/landing.html'
  });

  $stateProvider.state('song', {
    url: '/song',
    // controller: 'LandingController',
    templateUrl: '/templates/song.html'
  });

  $stateProvider.state('collection', {
    url: '/collection',
    controller: 'CollectionController',
    templateUrl: '/templates/collection.html'
  });
}]);

app.controller('LandingController', ['$scope', function($scope) {
  console.log('LandingController');
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
}]);

app.controller('CollectionController', ['$scope', function($scope) {
  $scope.albums = [];

  for (var i = 0; i < 33; i++) {
    $scope.albums.push(angular.copy(albumPicasso));
  }
}]);
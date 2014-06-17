// require("./landing");
// require("./collection");
// require("./album");
// require("./profile");


var app = angular.module('blocJams', []);

app.controller('LandingController', function() {
  this.subText = "Turn the music up!";
  this.title = "Bloc Jams";
  this.subTextClicked = function() {
    return this.subText += '!';
  };

  this.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  this.albumUrls = [
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
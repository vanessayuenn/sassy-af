document.addEventListener('DOMContentLoaded', getGif);
document.getElementById('more').addEventListener('click', function(e) {
  e.preventDefault();
  getGif();
});

var API_KEY = 'dc6zaTOxFJmzC';
var BASE_URL = '//api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var LIMIT = 1;
var QUERY = 'sassy';

function getGif() {
  var offset = Math.floor(Math.random() * 51);
  var request = new XMLHttpRequest();
  var reqUrl = BASE_URL + ENDPOINT +
    '?q=' + QUERY +
    '&api_key=' + API_KEY +
    '&limit=' + LIMIT +
    '&offset=' + offset;

  request.open('GET', reqUrl, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      if (data.data.length > 0) {
        setBg(data.data[0].images.fixed_height.url);
      }
    } else {
      handleError(request.status);
    }
  };
  request.onerror = handleError;
  request.send();
}

function setBg(url) {
  document.body.style.backgroundImage = 'url("' + url || '/img/fallback.gif' + '")';
}

function handleError(status) {
  console.log('error status', status);
}
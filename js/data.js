'use strict';

/* eslint-enable */

(function () {

  var message = document.querySelector('#messages').content.querySelector('div');

  var imgFilters = document.querySelector('.img-filters');

  var popularPhotos;
  var randomPhotos;
  var mostCommentedPhotos;


  var onSuccess = function (data) {
    imgFilters.classList.remove('img-filters--inactive');
    window.filter.showFilteredPhotos(data);

    window.data.popularPhotos = data;

    window.data.randomPhotos = window.filter.getRandomPhotos(data);

    window.data.mostCommentedPhotos = window.filter.getMostCommentedPhotos(data);
  };


  var onError = function (errorMessage) {
    message.classList.remove('img-upload__message--loading');
    document.querySelector('main').appendChild(message);
    message.textContent = errorMessage;
  };


  window.backend.fetchData(onSuccess, onError);


  window.data = {
    imgFilters: imgFilters,
    popularPhotos: popularPhotos,
    randomPhotos: randomPhotos,
    mostCommentedPhotos: mostCommentedPhotos
  };

})();

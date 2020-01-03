'use strict';

/* eslint-enable */

(function () {

  var message = document.querySelector('#messages').content.querySelector('div');

  var imgFilters = document.querySelector('.img-filters');

  var photosArray = [];


  var onSuccess = function (data) {
    imgFilters.classList.remove('img-filters--inactive');
    window.data.photosArray = data;
  };

  var onError = function (errorMessage) {
    message.classList.remove('img-upload__message--loading');
    document.querySelector('main').appendChild(message);
    message.textContent = errorMessage;
  };


  window.backend.fetchData(onSuccess, onError);


  window.data = {
    imgFilters: imgFilters,
    photosArray: photosArray
  };

})();

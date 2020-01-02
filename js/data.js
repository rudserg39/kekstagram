'use strict';

/* eslint-enable */

(function () {

  var photoElementsArray = [];


  var onSuccess = function (data) {
    window.data.photoElementsArray = data;
    window.thumbnails.renderPhotos(data);
    console.log(data);
  };

  console.log(photoElementsArray);

  var onError = function () {

  };


  window.backend.fetchData(onSuccess, onError);


  window.data = {
    onSuccess: onSuccess,
    photoElementsArray: photoElementsArray
  };

})();

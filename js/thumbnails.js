'use strict';

/* eslint-enable */

(function () {

  // Контейнер для вставки фото
  var photoContainer = document.querySelector('.pictures');

  // template фото
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');


  // Функция создания элемента фото
  var createPhotoElement = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    photoElement.addEventListener('click', function () {
      window.bigPhoto.thumbnailClickHandler(photo);
    });

    return photoElement;
  };


  // Функция отрисовки фото
  var renderPhotos = function (photosArray) {
    var fragment = document.createDocumentFragment();

    photosArray.forEach(function (photoElement) {
      fragment.appendChild(createPhotoElement(photoElement));
      photoContainer.appendChild(fragment);
    });
  };


  window.thumbnails = {
    renderPhotos: renderPhotos
  };

})();

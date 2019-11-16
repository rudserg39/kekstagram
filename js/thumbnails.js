'use strict';

/* eslint-enable */

(function () {

  // Контейнер для вставки фото
  var photoContainer = document.querySelector('.pictures');

  // template фото
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');


  // Функция создания элемента фото
  var createPhotoElement = function (photo) {
    var pictureElement = photoTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    pictureElement.addEventListener('click', function () {
      window.bigPhoto.thumbnailClickHandler(photo);
    });

    return pictureElement;
  };


  // Функция отрисовки фото
  var renderPhotos = function (photoData) {
    var fragment = document.createDocumentFragment();

    photoData.forEach(function (photoElement) {
      fragment.appendChild(createPhotoElement(photoElement));
      photoContainer.appendChild(fragment);
    });
  };


  window.thumbnails = {
    renderPhotos: renderPhotos
  };

})();

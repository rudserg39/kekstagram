'use strict';

/* eslint-enable */

(function () {

  // Контейнер для вставки фото
  var picturesContainer = document.querySelector('.pictures');

  // template фото
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


  // Функция создания фото
  var createPhotoElement = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };


  // Функция отрисовки фото
  var renderPhotos = function (pictureData) {
    var fragment = document.createDocumentFragment();

    pictureData.forEach(function (pictureElement) {
      fragment.appendChild(createPhotoElement(pictureElement));
      picturesContainer.appendChild(fragment);
    });
  };


  window.rendering = {
    renderPhotos: renderPhotos
  };

})();

'use strict';

/* eslint-enable */

(function () {

  // Большое фото
  var bigPhotoContainer = document.querySelector('.big-picture');
  var bigPhotoImg = bigPhotoContainer.querySelector('.big-picture__img').querySelector('img');
  var bigPhotoAvatarImg = bigPhotoContainer.querySelector('.social__picture');
  var closeButton = bigPhotoContainer.querySelector('.big-picture__cancel');


  // Обработчики

  // Показ фото
  var thumbnailClickHandler = function (photo) {
    bigPhotoImg.src = photo.url;
    bigPhotoAvatarImg.src = photo.comments.avatar;
    bigPhotoContainer.classList.remove('hidden');
  };

  // Закрытие фото
  var closeButtonClickHandler = function () {
    bigPhotoContainer.classList.add('hidden');
  };

  var escButtonKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      bigPhotoContainer.classList.add('hidden');
    }
  };

  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escButtonKeydownHandler);


  window.bigPhoto = {
    thumbnailClickHandler: thumbnailClickHandler,
    closeButtonClickHandler: closeButtonClickHandler,
    escButtonKeydownHandler: escButtonKeydownHandler
  };

})();

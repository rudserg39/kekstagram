'use strict';

/* eslint-enable */

(function () {

  // Большое фото
  var bigPhotoContainer = document.querySelector('.big-picture');
  var bigPhotoImg = bigPhotoContainer.querySelector('.big-picture__img').querySelector('img');
  var bigPhotoDescription = bigPhotoContainer.querySelector('.social__caption');
  var bigPhotoLikes = bigPhotoContainer.querySelector('.likes-count');
  var bigPhotoCommentsNumber = bigPhotoContainer.querySelector('.comments-count');
  var bigPhotoComments = bigPhotoContainer.querySelectorAll('li');
  var closeButton = bigPhotoContainer.querySelector('.big-picture__cancel');


  // Функция добавления комментариев к большому фото
  var addComments = function (photo) {
    for (var i = 0; i < bigPhotoComments.length; i++) {
      bigPhotoComments[i].querySelector('img').src = photo.comments[i].avatar;
      bigPhotoComments[i].querySelector('p').textContent = photo.comments[i].message;
    }
  };


  // Показ большого фото
  var thumbnailClickHandler = function (photo) {
    bigPhotoImg.src = photo.url;
    bigPhotoDescription.textContent = photo.description;
    bigPhotoLikes.textContent = photo.likes;
    bigPhotoCommentsNumber.textContent = photo.comments.length;
    bigPhotoContainer.classList.remove('hidden');
    addComments(photo);
  };


  // Закрытие большого фото
  window.utils.closeWindow(closeButton, 'click', bigPhotoContainer);
  window.utils.closeWindow(document, 'keydown', bigPhotoContainer);


  window.bigPhoto = {
    thumbnailClickHandler: thumbnailClickHandler
  };

})();

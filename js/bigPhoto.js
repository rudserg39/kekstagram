'use strict';

/* eslint-enable */

(function () {

  var photoContainer = document.querySelector('.big-picture');
  var photoImg = photoContainer.querySelector('.big-picture__img').querySelector('img');
  var photoDescription = photoContainer.querySelector('.social__caption');
  var photoLikes = photoContainer.querySelector('.likes-count');
  var photoCommentsNumber = photoContainer.querySelector('.comments-count');

  var photoCommentsList = photoContainer.querySelector('.social__comments');
  var photoComment = photoCommentsList.querySelector('li');
  var photoComments = photoCommentsList.querySelectorAll('li');

  var showCommentsButton = photoContainer.querySelector('.social__comments-loader');
  var closeButton = photoContainer.querySelector('.big-picture__cancel');


  // Создание элемента комментария
  var createCommentElement = function (comment) {
    var commentElement = photoComment.cloneNode(true);

    commentElement.querySelector('img').src = comment.avatar;
    commentElement.querySelector('p').textContent = comment.message;

    return commentElement;
  };


  // Обработчик нажатия кнопки показа дополнительных комментариев
  var showCommentsButtonCLickHandler = function (photo, add) {
    var fragment = document.createDocumentFragment();
    var commentsArray = Array.from(photoCommentsList.children);

    photo.comments.slice(2).forEach(function (comment) {
      if (add) {
        fragment.appendChild(createCommentElement(comment));
        photoCommentsList.appendChild(fragment);
      } else {
        commentsArray.slice(2).forEach(function (commentElement) {
          commentElement.remove();
        });
        showCommentsButton.classList.remove('hidden');
      }
    });
  };


  // Функция добавления комментариев к большому фото
  var addComments = function (photo) {
    // Добавление свойств для первых двух комментариев из разметки
    for (var i = 0; i < photoComments.length; i++) {
      photoComments[i].querySelector('img').src = photo.comments[i].avatar;
      photoComments[i].querySelector('p').textContent = photo.comments[i].message;
    }

    // Добавление и удаление дополнительных комментариев при клике на кнопку
    showCommentsButtonCLickHandler(photo, false);

    showCommentsButton.addEventListener('click', function () {
      showCommentsButtonCLickHandler(photo, false);
      showCommentsButtonCLickHandler(photo, true);
      showCommentsButton.classList.add('hidden');
    });
  };


  // Показ большого фото
  var thumbnailClickHandler = function (photo) {
    photoImg.src = photo.url;
    photoDescription.textContent = photo.description;
    photoLikes.textContent = photo.likes;
    photoCommentsNumber.textContent = photo.comments.length;
    photoContainer.classList.remove('hidden');
    addComments(photo);
  };


  // Закрытие фото
  window.utils.closeWindow(closeButton, 'click', photoContainer);
  window.utils.closeWindow(document, 'keydown', photoContainer);


  window.bigPhoto = {
    thumbnailClickHandler: thumbnailClickHandler
  };

})();

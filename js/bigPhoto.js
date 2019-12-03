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

  var showCommentsButton = photoContainer.querySelector('.social__comments-loader');
  var closeButton = photoContainer.querySelector('.big-picture__cancel');

  photoCommentsList.innerHTML = '';


  // Создание элемента комментария
  var createCommentElement = function (comment) {
    var commentElement = photoComment.cloneNode(true);

    commentElement.querySelector('img').src = comment.avatar;
    commentElement.querySelector('p').textContent = comment.message;

    return commentElement;
  };

  var counter = 5;

  // Обработчик нажатия кнопки показа дополнительных комментариев
  var showCommentsButtonClickHandler = function (photo, add) {
    var fragment = document.createDocumentFragment();
    var commentsArray = Array.from(photoCommentsList.children);


    if (counter > photo.comments.length) {
      showCommentsButton.classList.add('hidden');
    }

    photo.comments.slice(0, counter).forEach(function (comment) {
      if (add) {
        fragment.appendChild(createCommentElement(comment));
        photoCommentsList.appendChild(fragment);
      } else {
        commentsArray.slice(0, counter).forEach(function (commentElement) {
          commentElement.remove();
        });
        showCommentsButton.classList.remove('hidden');
      }
    });
  };


  // Функция добавления комментариев к большому фото
  var addComments = function (photo) {
    // Добавление и удаление дополнительных комментариев при клике на кнопку
    showCommentsButtonClickHandler(photo, false);

    showCommentsButton.addEventListener('click', function () {

      counter += 5;

      showCommentsButtonClickHandler(photo, false);
      showCommentsButtonClickHandler(photo, true);

      console.log(counter);
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
    counter = 5;
    showCommentsButtonClickHandler(photo, true);
  };


  // Закрытие фото
  window.utils.closeWindow(closeButton, 'click', photoContainer);
  window.utils.closeWindow(document, 'keydown', photoContainer);


  window.bigPhoto = {
    thumbnailClickHandler: thumbnailClickHandler
  };

})();

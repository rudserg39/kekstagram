'use strict';

/* eslint-enable */

(function () {

  var photoContainer = document.querySelector('.big-picture');
  var photoImg = photoContainer.querySelector('.big-picture__img').querySelector('img');
  var photoDescription = photoContainer.querySelector('.social__caption');
  var photoLikes = photoContainer.querySelector('.likes-count');
  var openedCommentsNumber = photoContainer.querySelector('.social__comment-count');

  var photoCommentsList = photoContainer.querySelector('.social__comments');
  var photoComment = photoCommentsList.querySelector('li');

  var showCommentsButton = photoContainer.querySelector('.social__comments-loader');
  var closeButton = photoContainer.querySelector('.big-picture__cancel');

  var commentsArray = [];
  var counter = 5;


  // Создание элемента комментария
  var createCommentElement = function (comment) {
    var commentElement = photoComment.cloneNode(true);

    commentElement.querySelector('img').src = comment.avatar;
    commentElement.querySelector('p').textContent = comment.message;

    return commentElement;
  };


  // Добавление комментариев в массив
  var addComments = function (photo) {
    photo.comments.forEach(function (comment) {
      commentsArray.push(createCommentElement(comment));
    });
  };


  // Добавление комментариев в разметку по 5 штук
  var showCommentsButtonClickHandler = function () {
    var fragment = document.createDocumentFragment();

    commentsArray.slice(0, window.bigPhoto.counter).forEach(function (comment) {
      fragment.appendChild(comment);
      photoCommentsList.appendChild(fragment);

      if (photoCommentsList.querySelectorAll('li').length === commentsArray.length) {
        showCommentsButton.classList.add('hidden');
      }

      openedCommentsNumber.textContent = commentsArray.length === 1 ? '1 комментарий' : photoCommentsList.querySelectorAll('li').length + ' из ' + commentsArray.length + ' комментариев';
    });
  };


  showCommentsButton.addEventListener('click', function () {
    window.bigPhoto.counter += 5;
    showCommentsButtonClickHandler();
  });


  // Показ большого фото
  var thumbnailClickHandler = function (photo) {
    photoImg.src = photo.url;
    photoDescription.textContent = photo.description;
    photoLikes.textContent = photo.likes;
    photoContainer.classList.remove('hidden');
    showCommentsButton.classList.remove('hidden');
    commentsArray = [];
    photoCommentsList.innerHTML = '';
    addComments(photo);
    showCommentsButtonClickHandler();
  };


  // Закрытие фото
  window.utils.closeWindow(closeButton, 'click', photoContainer, true, false);
  window.utils.closeWindow(document, 'keydown', photoContainer, true, false);


  window.bigPhoto = {
    counter: counter,
    thumbnailClickHandler: thumbnailClickHandler
  };

})();

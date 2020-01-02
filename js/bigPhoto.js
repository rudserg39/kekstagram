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


  // Функция увеличения счётчика комментариев
  var setCounter = function () {
    counter += 5;
  };


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

    commentsArray.slice(0, counter).forEach(function (comment) {
      fragment.appendChild(comment);
      photoCommentsList.appendChild(fragment);

      if (photoCommentsList.querySelectorAll('li').length === commentsArray.length) {
        showCommentsButton.classList.add('hidden');
      }

      openedCommentsNumber.textContent = commentsArray.length === 1 ? '1 комментарий' : photoCommentsList.querySelectorAll('li').length + ' из ' + commentsArray.length + ' комментариев';
    });
  };


  showCommentsButton.addEventListener('click', function () {
    setCounter();
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
    counter = 5;
    addComments(photo);
    showCommentsButtonClickHandler();
  };


  // Функция закрытия окна
  var closeWindow = function (eventElement, eventType, openedElement) {
    eventElement.addEventListener(eventType, function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE || eventType === 'click') {
        openedElement.classList.add('hidden');
      }
    });
  };

  // Закрытие фото
  closeWindow(closeButton, 'click', photoContainer);
  closeWindow(document, 'keydown', photoContainer);


  window.bigPhoto = {
    thumbnailClickHandler: thumbnailClickHandler
  };

})();

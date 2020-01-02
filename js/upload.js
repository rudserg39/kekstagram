'use strict';

(function () {

  var main = document.querySelector('main');

  var uploadInput = document.querySelector('#upload-file');

  var successMessage = document.querySelector('#success').content.querySelector('.success');

  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var tryAgainButton = errorMessage.querySelector('div > button:first-child');
  var uploadAnotherFileButton = errorMessage.querySelector('div > button:nth-child(2)');


  var showMessage = function (show, message) {
    return show === true ? main.appendChild(message) : message.remove();
  };


  var addMessageEvent = function (eventElement, eventType, message) {
    eventElement.addEventListener(eventType, function (evt) {
      if (eventType === 'keydown' && evt.keyCode === window.utils.ESC_KEYCODE) {
        showMessage(false, message);
      }

      if (eventType === 'click' && evt.target === message.querySelector('button') || evt.target === message) {
        showMessage(false, message);
      }

      if (evt.target === uploadAnotherFileButton) {
        showMessage(false, message);
        uploadInput.click();
      }
    });

  };

  addMessageEvent(document, 'keydown', successMessage);
  addMessageEvent(successMessage, 'click', successMessage);

  addMessageEvent(document, 'keydown', errorMessage);
  addMessageEvent(errorMessage, 'click', errorMessage);


  var onSuccess = function () {
    window.validation.editorCloseButtonHandler();
    showMessage(true, successMessage);
  };


  var onError = function () {
    window.validation.editorCloseButtonHandler();
    showMessage(true, errorMessage);
  };


  window.validation.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveData(new FormData(window.validation.form), onSuccess, onError);
  });


})();

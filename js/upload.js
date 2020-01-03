'use strict';

(function () {

  var main = document.querySelector('main');

  var uploadInput = document.querySelector('#upload-file');

  var uploadSubmitButton = document.querySelector('.img-upload__submit');

  var successMessage = document.querySelector('#success').content.querySelector('.success');

  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorMessage.querySelector('h2');
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
        window.validation.editorCloseButtonHandler();
        showMessage(false, message);
        uploadInput.click();
      }

      if (evt.target === tryAgainButton) {
        showMessage(false, message);
        uploadSubmitButton.click();
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

  var onError = function (message) {
    errorTitle.textContent = message;
    window.image.editForm.classList.add('hidden');
    showMessage(true, errorMessage);
  };


  window.validation.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveData(new FormData(window.validation.form), onSuccess, onError);
  });


})();

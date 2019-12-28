'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop'];


  var imgEditForm = document.querySelector('.img-upload__overlay');

  var imgFileChooser = document.querySelector('.img-upload__start input[type=file]');
  var imgDropArea = document.querySelector('.img-upload__label');


  // Функция удаления действия по умолчанию при перетаскивании файла
  var preventEvents = function (element, eventType) {
    element.addEventListener(eventType, function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });
  };

  EVENTS.forEach(function (eventType) {
    preventEvents(imgDropArea, eventType);
  });


  // Функция для отображения превью картинки при перетаскивании и загрузки в форму
  var uploadImage = function (eventType, fileChooser, preview) {
    fileChooser.addEventListener(eventType, function (evt) {

      var file = eventType === 'drop' ? evt.dataTransfer.files[0] : evt.target.files[0];

      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        var inputLoadHandler = function () {
          preview.src = reader.result;
          imgEditForm.classList.remove('hidden');
          window.edit.setEffectDepthLineInitialState(true);
        };

        reader.addEventListener('load', inputLoadHandler);

        reader.readAsDataURL(file);
      }
    });
  };

  uploadImage('drop', imgDropArea, window.edit.image);
  uploadImage('change', imgFileChooser, window.edit.image);


  window.upload = {
    imgEditForm: imgEditForm
  };

})();

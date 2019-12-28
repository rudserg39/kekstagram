'use strict';

/* eslint-enable */

(function () {

  var border = {
    GRAY: '3px solid gray',
    GREEN: '3px solid green',
    RED: '3px solid red'
  };

  var TAGS_MAX = 5;
  var TAG_MAX_LENGTH = 20;
  var DESCRIPTION_MAX_LENGTH = 140;

  var focus = 'focus';
  var blur = 'blur';


  var descriptionForm = document.querySelector('.img-upload__text');
  var tagsInput = descriptionForm.querySelector('.text__hashtags');
  var photoDescription = descriptionForm.querySelector('.text__description');

  var closeImgEditFormButton = document.querySelector('.img-upload__cancel');

  var borderColor = border.GRAY;
  var text = '';
  var validity = text;


  // Функция подсветки рамки формы
  var setBorderColor = function (element, color) {
    element.style.border = color;
    element.style.outline = 'none';
  };

  // Установка стандартного состояния рамки
  setBorderColor(tagsInput, border.GRAY);
  setBorderColor(photoDescription, border.GRAY);


  // Функция получение массива строк (тегов)
  var getTags = function () {
    // Деление строки на отдельные строки по пробелам и исключение пустых строк
    var tags = tagsInput.value.split(' ').filter(function (tag) {
      return tag !== '';
    });

    return tags;
  };


  // Функция валидации формы тегов
  var checkTagsInputValidity = function (tags) {
    var isValid = true;
    tagsInput.setCustomValidity('');

    tags.forEach(function (tag) {
      if (!tag.startsWith('#')) {
        isValid = false;
        text = 'Хэш-тег должен начинаться с "#"';
      }

      if (tag === '#') {
        isValid = false;
        text = 'Хэш-тег не может состоять только из одной решётки';
      }

      if (tag.startsWith('#') && tag.match(/#/g).length > 1) {
        isValid = false;
        text = 'Хэш-теги разделяются пробелами';
      }


      var repeats = tags.filter(function (checkedTag) {
        return tag.toLowerCase() === checkedTag.toLowerCase();
      });

      if (repeats.length > 1) {
        isValid = false;
        text = 'Один и тот же хэш-тег не может быть использован дважды';
      }


      if (tags.length > TAGS_MAX) {
        isValid = false;
        text = 'Нельзя указать больше пяти хэш-тегов';
      }

      if (tag.length > TAG_MAX_LENGTH) {
        isValid = false;
        text = 'Максимальная длина одного хэш-тега 20 символов';
      }
    });

    validity = isValid === true ? '' : text;

    tagsInput.setCustomValidity(validity);

    if (tags.length === 0) {
      borderColor = border.GRAY;
    } else if (tags.length > 0 && isValid) {
      borderColor = border.GREEN;
    } else {
      borderColor = border.RED;
    }

    setBorderColor(tagsInput, borderColor);
  };


  // Функция валидации формы описания фото
  var checkPhotoDescriptionValidity = function () {
    if (photoDescription.value.length === 0) {
      borderColor = border.GRAY;
    } else if (photoDescription.value.length < DESCRIPTION_MAX_LENGTH) {
      borderColor = border.GREEN;
    } else {
      borderColor = border.RED;
    }

    setBorderColor(photoDescription, borderColor);

    text = photoDescription.value.length < DESCRIPTION_MAX_LENGTH ? '' : 'Длина комментария не может составлять больше 140 символов';

    photoDescription.setCustomValidity(text);
  };


  // Обработчик input (добавление и валидация тегов)
  var formInputHandler = function (evt) {
    if (evt.target === tagsInput) {
      checkTagsInputValidity(getTags());
    } else {
      checkPhotoDescriptionValidity();
    }
  };

  descriptionForm.addEventListener('input', formInputHandler);


  // Функции закрытия окна редактирования и загрузки фото

  var closeButtonClickHandler = function () {
    window.upload.imgEditForm.classList.add('hidden');
  };

  closeImgEditFormButton.addEventListener('click', closeButtonClickHandler);


  // Обработчик нажатия ESC
  var documentKeydonwHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      window.upload.imgEditForm.classList.add('hidden');
    }
  };


  // Функция добавления и удаления обработчика нажатия ESC
  var formFocusHandler = function (element) {
    if (focus) {
      element.addEventListener(focus, function () {
        document.removeEventListener('keydown', documentKeydonwHandler);
      });
    }

    if (blur) {
      element.addEventListener(blur, function () {
        document.addEventListener('keydown', documentKeydonwHandler);
      });
    }
  };

  formFocusHandler(tagsInput, focus, blur);
  formFocusHandler(photoDescription, focus, blur);

})();

'use strict';

/* eslint-enable */

(function () {

  var border = {
    GRAY: '3px solid gray',
    GREEN: '3px solid green',
    RED: '3px solid red'
  };


  var descriptionForm = document.querySelector('.img-upload__text');
  var tagsInput = descriptionForm.querySelector('.text__hashtags');
  var photoDescription = descriptionForm.querySelector('.text__description');

  var borderColor = border.GRAY;
  var text = '';
  var validity = text;


  // Функция подсветки рамки формы
  var setBorderColor = function (element, color) {
    element.style.border = color;
    element.style.outline = 'none';
  };

  // Установка Стандартного состояния рамки
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


      if (tags.length > 5) {
        isValid = false;
        text = 'Нельзя указать больше пяти хэш-тегов';
      }

      if (tag.length > 20) {
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
    } else if (photoDescription.value.length < 140) {
      borderColor = border.GREEN;
    } else {
      borderColor = border.RED;
    }

    setBorderColor(photoDescription, borderColor);

    text = photoDescription.value.length < 140 ? '' : 'Длина комментария не может составлять больше 140 символов';

    photoDescription.setCustomValidity(text);
  };


  descriptionForm.addEventListener('input', function (evt) {
    if (evt.target === tagsInput) {
      checkTagsInputValidity(getTags());
    } else {
      checkPhotoDescriptionValidity();
    }
  });


  var documentKeydonwHandler = function (evt) {
    if (evt.keyCode === 27) {
      window.upload.imgEditForm.classList.add('hidden');
    }
  };

  var setFormEvent = function (add, element, eventType, handler) {
    if (add) {
      element.addEventListener(eventType, handler);
    } else {
      element.removeEventListener(eventType, handler);
    }
  };

  setFormEvent(true, document, 'keydown', documentKeydonwHandler);

  tagsInput.addEventListener('focus', function () {
    setFormEvent(false, document, 'keydown', documentKeydonwHandler);
  });

  tagsInput.addEventListener('blur', function () {
    setFormEvent(true, document, 'keydown', documentKeydonwHandler);
  });

})();

'use strict';

/* eslint-enable */

(function () {

  var border = {
    GRAY: '3px solid gray',
    GREEN: '3px solid green',
    RED: '3px solid red'
  };


  var tagsInput = document.querySelector('.text__hashtags');
  var photoDescription = document.querySelector('.text__description');

  var text;


  tagsInput.style.border = border.GRAY;
  tagsInput.style.outline = 'none';

  photoDescription.style.border = border.GRAY;
  photoDescription.style.outline = 'none';


  var getTags = function () {
    // Деление строки на отдельные строки по пробелам и исключение пустых строк
    var tags = tagsInput.value.split(' ').filter(function (tag) {
      return tag !== '';
    });

    return tags;
  };


  var checkFormValidity = function (tags) {
    var isValid = true;

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


      if (isValid) {
        tagsInput.setCustomValidity('');
        tagsInput.style.border = border.GREEN;
      } else {
        tagsInput.setCustomValidity(text);
        tagsInput.style.border = border.RED;
      }
    });

    if (tags.length === 0) {
      tagsInput.setCustomValidity('');
      tagsInput.style.border = border.GRAY;
    }
  };


  tagsInput.addEventListener('input', function () {
    checkFormValidity(getTags());
  });

})();

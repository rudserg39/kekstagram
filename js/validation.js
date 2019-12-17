'use strict';

/* eslint-enable */

(function () {

  var tagsInput = document.querySelector('.text__hashtags');

  tagsInput.style.outline = 'none';


  var checkFormValidity = function () {

    // Деление строки на отдельные строки по пробелам
    var tags = tagsInput.value.split(' ');

    // Исключение пустых строк
    var contentTags = tags.filter(function (tag) {
      return tag !== '';
    });


    contentTags.forEach(function (tag) {

      if (tag.toString().substr(0, 1) !== '#') {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Хэш-тег должен начинаться с "#"');
      } else {
        tagsInput.setCustomValidity('');
        tagsInput.style.border = '2px solid green';
      }


      if (tag.toString().substr() === '#') {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      }


      var repeats = contentTags.filter(function (checkedTag) {
        return tag === checkedTag;
      });

      if (repeats.length > 1) {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      }

      if (contentTags.length > 5) {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      }


      if (tagsInput.value === '') {
        tagsInput.style.border = 'none';
      }

    });

  };


  tagsInput.addEventListener('input', function () {
    checkFormValidity();
  });


})();

// После очистки tagsInput.value при ошибке, всё равно выводится сообение о той же ошибке

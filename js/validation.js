'use strict';

/* eslint-enable */

(function () {

  var tagsInput = document.querySelector('.text__hashtags');

  tagsInput.style.outline = 'none';


  var getTags = function () {
    // Деление строки на отдельные строки по пробелам и исключение пустых строк
    var tags = tagsInput.value.split(' ').filter(function (tag) {
      return tag !== '';
    });

    return tags;
  };


  var checkFormValidity = function (tags) {

    tags.forEach(function (tag) {
      // startsWith()
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


      if (tagsInput.value.substr(0, 1) === '#' && tag.match(/#/g).length > 1) {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Хэш-теги разделяются пробелами');
      }


      var repeats = tags.filter(function (checkedTag) {
        return tag.toLowerCase() === checkedTag.toLowerCase();
      });

      if (repeats.length > 1) {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      }


      if (tags.length > 5) {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      }

      if (tag.length > 20) {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      }


      if (tagsInput.value === '') {
        tagsInput.style.border = 'none';
      }

    });
  };


  tagsInput.addEventListener('input', function () {
    checkFormValidity(getTags());
  });


})();

// После очистки tagsInput.value при ошибке, всё равно выводится сообение о той же ошибке

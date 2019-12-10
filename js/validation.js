'use strict';

/* eslint-enable */

(function () {

  var tagsInput = document.querySelector('.text__hashtags');

  tagsInput.style.outline = 'none';


  var checkFormValidity = function () {

    var tagsArray = [];
    var tags = tagsInput.value.split(' ');
    tagsArray.push(tags);

    tagsArray.forEach(function (tag) {

      if (tag.toString().slice(0, 1) !== '#') {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Хэш-тег должен начинаться с "#"');
      } else {
        tagsInput.setCustomValidity('');
        tagsInput.style.border = '2px solid green';
      }

      if (tag.toString().length < 2) {
        tagsInput.style.border = '2px solid red';
        tagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      }

      if (tags.length > 5) {
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

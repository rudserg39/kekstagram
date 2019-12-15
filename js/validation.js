'use strict';

/* eslint-enable */

(function () {

  var tagsInput = document.querySelector('.text__hashtags');

  tagsInput.style.outline = 'none';


  

  // Исключение пустых строк
  var filterTags = function (tag) {
    return tag !== '';
  };

  var addTags = function () {
    // Деление введённого текста на отдельные строки по пробелам
    var tags = tagsInput.value.split(' ').filter(filterTags);
    return tags;
  };

  

  tagsInput.addEventListener('input', function () {
    var tagsArray = [];
    tagsArray.push(addTags())
    console.log(tagsArray);

    tagsArray.forEach(function (tag) {
      console.log(tag)
    });
  });



//   // // Исключение пустых строк
//   // var contentTags = tags.filter(function (tag) {
//   //   return tag !== '';
//   // });


//     contentTags.forEach(function (tag) {

//       // if (tag.toString().substr(0, 1) !== '#') {
//       //   tagsInput.style.border = '2px solid red';
//       //   tagsInput.setCustomValidity('Хэш-тег должен начинаться с "#"');
//       // } else {
//       //   tagsInput.setCustomValidity('');
//       //   tagsInput.style.border = '2px solid green';
//       // }


//       // if (tag.toString().substr() === '#') {
//       //   tagsInput.style.border = '2px solid red';
//       //   tagsInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
//       // }


//       // if (tagsInput.value.substr(0, 1) === '#' && tag.match(/#/g).length > 1) {
//       //   tagsInput.style.border = '2px solid red';
//       //   tagsInput.setCustomValidity('Хэш-теги разделяются пробелами');
//       // }
// console.log(contentTags);
// console.log(tag);

//       // var repeats = contentTags.filter(function (checkedTag) {
//       //   return tag.toLowerCase() === checkedTag.toLowerCase();
//       // });

//       // if (repeats.length > 1) {
//       //   tagsInput.style.border = '2px solid red';
//       //   tagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
//       // }


//       // if (contentTags.length > 5) {
//       //   tagsInput.style.border = '2px solid red';
//       //   tagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
//       // }

//       // if (tag.length > 20) {
//       //   tagsInput.style.border = '2px solid red';
//       //   tagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
//       // }


//       // if (tagsInput.value === '') {
//       //   tagsInput.style.border = 'none';
//       // }

//     });

//   };


//   tagsInput.addEventListener('input', function () {
//     checkFormValidity();
//   });

})();

// После очистки tagsInput.value при ошибке, всё равно выводится сообение о той же ошибке

// Прии повторе тега 3 раза не выдаёт ошибку

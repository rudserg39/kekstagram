'use strict';

/* eslint-enable */

(function () {

  var RANDOM_PHOTOS_NUMBER = 10;

  var filterForm = window.data.imgFilters.querySelector('.img-filters__form');
  var filtersFormButtons = filterForm.querySelectorAll('.img-filters__button');
  var filterPopular = filterForm.querySelector('#filter-popular');
  var filterRandom = filterForm.querySelector('#filter-random');
  var filterDiscussed = filterForm.querySelector('#filter-discussed');

  var filteredPhotos = [];


  // Функция выделения кнопок фильтров
  var addFilterButtonClass = function (filter) {
    filterForm.addEventListener('click', function (evt) {
      return evt.target === filter ? filter.classList.add('img-filters__button--active') : filter.classList.remove('img-filters__button--active');
    });
  };

  filtersFormButtons.forEach(function (filterButton) {
    addFilterButtonClass(filterButton);
  });


  // Функция удаления ранее отображенных фото
  var removePreviousPhotos = function () {
    document.querySelector('.pictures').querySelectorAll('.picture').forEach(function (picture) {
      picture.remove();
    });
  };


  // Функция получения отсортированного случайным образом массива
  // Алгоритм Фишера-Йетса https://habr.com/ru/post/358094/
  var getRandomPhotos = function (array) {
    var j;
    var temp;

    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array.slice(0, RANDOM_PHOTOS_NUMBER);
  };


  // Функция сортировки фото в порядке убывания количества комментариев
  var getMostCommentedPhotos = function (array) {
    var mostCommentedPhotos = array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return mostCommentedPhotos;
  };


  filterForm.addEventListener('click', function (evt) {
    removePreviousPhotos();

    if (evt.target === filterPopular) {
      filteredPhotos = window.data.photosArray;
    }

    if (evt.target === filterRandom) {
      filteredPhotos = getRandomPhotos(window.data.photosArray);
    }

    if (evt.target === filterDiscussed) {
      filteredPhotos = getMostCommentedPhotos(window.data.photosArray);
    }

    window.thumbnails.renderPhotos(filteredPhotos);


    console.log(window.data.photosArray);
    console.log(filteredPhotos);
  });


  window.filter = {
    filterPopular: filterPopular
  };

})();



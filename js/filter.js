'use strict';

/* eslint-enable */

(function () {

  var RANDOM_PHOTOS_NUMBER = 10;

  var filterForm = window.data.imgFilters.querySelector('.img-filters__form');
  var filtersFormButtons = filterForm.querySelectorAll('.img-filters__button');
  var filterPopular = filterForm.querySelector('#filter-popular');
  var filterRandom = filterForm.querySelector('#filter-random');
  var filterDiscussed = filterForm.querySelector('#filter-discussed');


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
    var newArray = array.slice(0);

    for (var i = newArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArray[j];
      newArray[j] = newArray[i];
      newArray[i] = temp;
    }

    return newArray.slice(0, RANDOM_PHOTOS_NUMBER);
  };


  // Функция сортировки фото в порядке убывания количества комментариев
  var getMostCommentedPhotos = function (array) {
    var newArray = array.slice(0);

    var mostCommentedPhotos = newArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return mostCommentedPhotos;
  };


  // Функция отображения отфильтрованных фото
  var showFilteredPhotos = function (filteredArray) {
    window.thumbnails.renderPhotos(filteredArray);
  };


  // Обработчик клика по фильтру
  var filterClickHandler = window.utils.setInterval(function (evt) {
    removePreviousPhotos();

    if (evt.target === filterPopular) {
      showFilteredPhotos(window.data.popularPhotos);
    }

    if (evt.target === filterRandom) {
      showFilteredPhotos(window.data.randomPhotos);
    }

    if (evt.target === filterDiscussed) {
      showFilteredPhotos(window.data.mostCommentedPhotos);
    }
  });


  filterForm.addEventListener('click', function (evt) {
    filterClickHandler(evt);
  });


  window.filter = {
    filterPopular: filterPopular,
    getRandomPhotos: getRandomPhotos,
    getMostCommentedPhotos: getMostCommentedPhotos,
    showFilteredPhotos: showFilteredPhotos
  };

})();



'use strict';

/* eslint-enable */

(function () {

  var filterForm = window.data.imgFilters.querySelector('.img-filters__form');
  var filtersFormButtons = filterForm.querySelectorAll('.img-filters__button');
  var filterPopular = filterForm.querySelector('#filter-popular');
  var filterRandom = filterForm.querySelector('#filter-random');
  var filterDiscussed = filterForm.querySelector('#filter-discussed');

  var filteredPhotos = [];


  var getMostCommentedPhotos = function (photo) {
    return photo.comments.length < 5;
  };

  var addFilterButtonClass = function (filter) {
    filterForm.addEventListener('click', function (evt) {
      return evt.target === filter ? filter.classList.add('img-filters__button--active') : filter.classList.remove('img-filters__button--active');
    });
  };

  filtersFormButtons.forEach(function (filterButton) {
    addFilterButtonClass(filterButton);
  });


  filterForm.addEventListener('click', function (evt) {
    var pictures = document.querySelector('.pictures').querySelectorAll('.picture');

    if (evt.target === filterPopular) {
      filteredPhotos = window.data.photosArray;
    }

    if (evt.target === filterRandom) {
      filteredPhotos = window.data.photosArray.filter(getMostCommentedPhotos);
    }

    if (pictures.length < filteredPhotos.length) {
      window.thumbnails.renderPhotos(filteredPhotos);
    }

    console.log(filteredPhotos);
  });


  window.filter = {
    filterPopular: filterPopular,
    filteredPhotos: filteredPhotos
  };

})();



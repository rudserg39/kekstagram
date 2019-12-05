'use strict';

/* eslint-enable */

(function () {

  var imgScale = {
    MIN: '25%',
    MAX: '100%'
  };

  var STEP = 25;

  var filter = {
    CHROME: 'grayscale',
    SEPIA: 'sepia',
    MARVIN: 'invert',
    PHOBOS: 'blur',
    HEAT: 'brightness'
  };

  var pinLineBoorders = {
    LEFT: 0,
    RIGHT: 453
  };


  // Элементы изменения размера фото
  var scaleEditorContainer = document.querySelector('.img-upload__scale');
  var scaleButtonSmall = scaleEditorContainer.querySelector('.scale__control--smaller');
  var scaleButtonBig = scaleEditorContainer.querySelector('.scale__control--bigger');
  var scaleValue = scaleEditorContainer.querySelector('.scale__control--value');
  var image = document.querySelector('.img-upload__preview').querySelector('img');


  // Элементы пина и фильтров
  var pinContainer = document.querySelector('.img-upload__effect-level');
  var pin = pinContainer.querySelector('.effect-level__pin');
  var effectDepthLine = pinContainer.querySelector('.effect-level__depth');
  var effectsList = document.querySelector('.effects__list');


  // Изменения размера фото
  var scaleButtonClickHandler = function (evt) {
    if (evt.target === scaleButtonSmall) {
      scaleValue.value = parseInt(scaleValue.value, 10) > parseInt(imgScale.MIN, 10) ? (parseInt(scaleValue.value, 10) - STEP) + '%' : imgScale.MIN;
    }

    if (evt.target === scaleButtonBig) {
      scaleValue.value = parseInt(scaleValue.value, 10) < parseInt(imgScale.MAX, 10) ? (parseInt(scaleValue.value, 10) + STEP) + '%' : imgScale.MAX;
    }

    image.setAttribute('style', 'transform: scale(' + parseInt(scaleValue.value, 10) / 100 + ')');
  };

  scaleEditorContainer.addEventListener('click', scaleButtonClickHandler);


  // Функция установки типа и глубины фильтра
  var setFilter = function (filterType, value) {
    var depth;

    if (filterType === filter.CHROME || filter.SEPIA) {
      depth = filterType + '(' + (parseInt(value, 10) / pinLineBoorders.RIGHT) + ')';
    }
    if (filterType === filter.MARVIN) {
      depth = filterType + '(' + Math.floor(parseInt(value, 10) / pinLineBoorders.RIGHT * 100) + '%)';
    }

    if (filterType === filter.PHOBOS) {
      depth = filterType + '(' + (parseInt(value, 10) / pinLineBoorders.RIGHT * 3) + 'px)';
    }

    if (filterType === filter.HEAT) {
      depth = filterType + '(' + (parseInt(value, 10) / pinLineBoorders.RIGHT * 3) + ')';
    }

    if (filterType === filter.ORIGINAL) {
      image.removeAttribute('style');
    }

    return depth;
  };


  // Изменение фильтров
  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x
      };

      startCoords = {
        x: moveEvt.clientX
      };


      pin.style.left = pin.offsetLeft + shift.x + 'px';

      effectDepthLine.style.width = pin.style.left;

      if (pin.offsetLeft < pinLineBoorders.LEFT) {
        pin.style.left = pinLineBoorders.LEFT + 'px';
      }

      if (pin.offsetLeft > pinLineBoorders.RIGHT) {
        pin.style.left = pinLineBoorders.RIGHT + 'px';
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();


// effectsList.addEventListener('click', function (evt) {

//   if (evt.target === effectsList.querySelector('#effect-none')) {
//     filterType = filter.ORIGINAL;
//   }

//   if (evt.target === effectsList.querySelector('#effect-chrome')) {
//     filterType = filter.CHROME;
//   }

//   if (evt.target === effectsList.querySelector('#effect-sepia')) {
//     filterType = filter.SEPIA;
//   }

//   if (evt.target === effectsList.querySelector('#effect-marvin')) {
//     filterType = filter.SEPIA;
//   }

//   if (evt.target === effectsList.querySelector('#effect-phobos')) {
//     filterType = filter.PHOBOS;
//   }

//   if (evt.target === effectsList.querySelector('#effect-heat')) {
//     filterType = filter.HEAT;
//   }

// });

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
    HEAT: 'brightness',
    NONE: 'none'
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
  var effectDepthLineContainer = document.querySelector('.img-upload__effect-level');
  var effectDepthLine = effectDepthLineContainer.querySelector('.effect-level__depth');
  var effectsList = document.querySelector('.effects__list');
  var filterType;


  // Изменение размера фото
  var scaleButtonClickHandler = function (evt) {
    if (evt.target === scaleButtonSmall) {
      scaleValue.value = parseInt(scaleValue.value, 10) > parseInt(imgScale.MIN, 10) ? (parseInt(scaleValue.value, 10) - STEP) + '%' : imgScale.MIN;
    }

    if (evt.target === scaleButtonBig) {
      scaleValue.value = parseInt(scaleValue.value, 10) < parseInt(imgScale.MAX, 10) ? (parseInt(scaleValue.value, 10) + STEP) + '%' : imgScale.MAX;
    }

    image.style.transform = ('scale(' + parseInt(scaleValue.value, 10) / 100 + ')');
  };

  scaleEditorContainer.addEventListener('click', scaleButtonClickHandler);


  // Функция установки линии глубины фильтра в начальное состояние
  var setEffectDepthLineInitialState = function (reupload) {
    pin.style.left = pinLineBoorders.RIGHT + 'px';
    effectDepthLine.style.width = pin.style.left;

    if (reupload) {
      effectDepthLineContainer.classList.add('hidden');
    }
  };


  // Функция установки типа и глубины фильтра
  var setFilter = function (selectedfilter, value) {
    var depth;

    effectDepthLineContainer.classList.remove('hidden');

    if (selectedfilter === filter.CHROME || filter.SEPIA) {
      depth = selectedfilter + '(' + (parseInt(value, 10) / pinLineBoorders.RIGHT) + ')';
    }

    if (selectedfilter === filter.MARVIN) {
      depth = selectedfilter + '(' + Math.floor(parseInt(value, 10) / pinLineBoorders.RIGHT * 100) + '%)';
    }

    if (selectedfilter === filter.PHOBOS) {
      depth = selectedfilter + '(' + (parseInt(value, 10) / pinLineBoorders.RIGHT * 3) + 'px)';
    }

    if (selectedfilter === filter.HEAT) {
      depth = selectedfilter + '(' + (parseInt(value, 10) / pinLineBoorders.RIGHT * 3) + ')';
    }

    if (selectedfilter === filter.NONE) {
      image.style.filter = filter.NONE;
      effectDepthLineContainer.classList.add('hidden');
    }

    return depth;
  };


  // Функция получения выбранного элемента фильтра
  var getCheckedElement = function () {
    var checkedElement = effectsList.querySelector('input:checked');
    return checkedElement;
  };


  // Функция получение типа фильтра
  var effectsListChangeHandler = function () {
    var checkedElement = getCheckedElement();

    Object.keys(filter).forEach(function (filterItem) {
      if (filterItem === checkedElement.value.toUpperCase()) {
        window.edit.filterType = filter[filterItem];
      }
    });

    setEffectDepthLineInitialState(false);
    image.style.filter = setFilter(window.edit.filterType, pin.style.left);
    image.className = 'effects__preview--' + checkedElement.value;
  };

  effectsList.addEventListener('change', effectsListChangeHandler);


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

      image.style.filter = setFilter(window.edit.filterType, pin.style.left);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });


  window.edit = {
    image: image,
    setEffectDepthLineInitialState: setEffectDepthLineInitialState,
    filterType: filterType
  };

})();

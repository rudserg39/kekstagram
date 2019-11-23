'use strict';

/* eslint-enable */

(function () {

  var IMG_SCALE = {
    min: '25%',
    max: '100%'
  };

  var STEP = 25;

  // Элементы изменения размера фото
  var scaleEditorContainer = document.querySelector('.img-upload__scale');
  var scaleButtonSmall = scaleEditorContainer.querySelector('.scale__control--smaller');
  var scaleButtonBig = scaleEditorContainer.querySelector('.scale__control--bigger');
  var scaleValue = scaleEditorContainer.querySelector('.scale__control--value');
  var scaledImg = document.querySelector('.img-upload__preview').querySelector('img');


  // Функция изменения размера фото
  var scaleButtonClickHandler = function (evt) {
    if (evt.target === scaleButtonSmall) {
      scaleValue.value = parseInt(scaleValue.value, 10) > parseInt(IMG_SCALE.min, 10) ? (parseInt(scaleValue.value, 10) - STEP) + '%' : IMG_SCALE.min;
    }

    if (evt.target === scaleButtonBig) {
      scaleValue.value = parseInt(scaleValue.value, 10) < parseInt(IMG_SCALE.max, 10) ? (parseInt(scaleValue.value, 10) + STEP) + '%' : IMG_SCALE.max;
    }

    scaledImg.setAttribute('style', 'transform: scale(' + parseInt(scaleValue.value, 10) / 100 + ')');
  };

  scaleEditorContainer.addEventListener('click', scaleButtonClickHandler);

})();

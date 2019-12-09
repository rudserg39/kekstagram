'use strict';

/* eslint-enable */

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;


  // Функция показа окна
  var openWindow = function (eventElement, eventType, closedElement) {
    eventElement.addEventListener(eventType, function () {
      closedElement.classList.remove('hidden');
    });
  };


  // Функция закрытия окна
  var closeWindow = function (eventElement, eventType, openedElement, counter, prewiev) {
    eventElement.addEventListener(eventType, function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        openedElement.classList.add('hidden');
      }

      if (eventType === 'click') {
        openedElement.classList.add('hidden');
      }

      if (counter) {
        window.bigPhoto.counter = 5;
      }

      if (prewiev) {
        window.edit.image.style.filter = 'none';
        window.edit.image.style.transform = 'scale(1)';
        window.edit.setEffectDepthLineInitialState(true);
      }
    });
  };


  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    openWindow: openWindow,
    closeWindow: closeWindow
  };

})();


// 1) Добавить перезакрузку формы при закрытии окна нажатием ESC
// 2) Удаление загруженной картинки при отправке данных
// 3) Фото не загружается повторно при закрытии окна через esc

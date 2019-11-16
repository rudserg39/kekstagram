'use strict';

/* eslint-enable */

(function () {

  var serverUrl = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagram/'
  };


  var createXhr = function (url, method, onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус' + ' ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      var errorMessage = method === 'GET' ? 'Произошла ошибка запроса' : 'Произошла ошибка соединения';
      onError(errorMessage);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться' + ' ' + xhr.timeout);
    });


    xhr.open(method, url);

    return xhr;
  };


  var fetchData = function (onSuccess, onError) {
    createXhr(serverUrl.LOAD, 'GET', onSuccess, onError).send();
  };

  var saveData = function (data, onSuccess, onError) {
    createXhr(serverUrl.UPLOAD, 'POST', onSuccess, onError).send(data);
  };


  window.backend = {
    fetchData: fetchData,
    saveData: saveData
  };

})();


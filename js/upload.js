'use strict';

(function () {

  var uploadForm = document.querySelector('#upload-file');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var closeImgEditFormButton = document.querySelector('.img-upload__cancel');

  // Открытие и закрытие окна редактирование фото
  window.utils.openWindow(uploadForm, 'change', imgEditForm);
  window.utils.closeWindow(closeImgEditFormButton, 'click', imgEditForm);
  window.utils.closeWindow(document, 'keydown', imgEditForm);

  imgEditForm.classList.remove('hidden');
})();

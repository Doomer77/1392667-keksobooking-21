'use strict';

(function () {
  const SERVER_URL = {
    LOAD: 'https://21.javascript.pages.academy/keksobooking/data',
  };
  const MESSAGE_TEXT = {
    ERROR_LOAD: 'Произошла неизвестная ошибка. Пожалуйста, обновите страницу.',
    ERROR_SERVER: 'Произошла ошибка соединения. Пожалуйста, обновите страницу.',
    ERROR_TIMEOUT: 'Сервер долго не отвечает. Пожалуйста, обновите страницу.'
  };
  const createXhr = (method, url, onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(MESSAGE_TEXT.ERROR_LOAD);
      }
    });
    xhr.addEventListener('error', () => {
      onError(MESSAGE_TEXT.ERROR_SERVER);
    });
    xhr.addEventListener('timeout', () => {
      onError(MESSAGE_TEXT.ERROR_TIMEOUT);
    });
    xhr.open(method, url);
    return xhr;
  };
  const load = (onLoad, onError) => {
    createXhr('GET', SERVER_URL.LOAD, onLoad, onError).send();
  };
  window.backend = {
    load: load,
  };
})();

'use strict';

const SERVER_URL = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};

const MESSAGE_TEXT = {
  ERROR_LOAD: `Произошла неизвестная ошибка. Пожалуйста, обновите страницу.`,
  ERROR_SERVER: `Произошла ошибка соединения. Пожалуйста, обновите страницу`,
  ERROR_TIMEOUT: `Сервер долго не отвечает. Пожалуйста, обновите страницу.`
};

const createXhr = (method, url, onLoad, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError(MESSAGE_TEXT.ERROR_LOAD);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(MESSAGE_TEXT.ERROR_SERVER);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(MESSAGE_TEXT.ERROR_TIMEOUT);
  });
  xhr.open(method, url);
  return xhr;
};

const load = (onLoad, onError) => {
  createXhr(`GET`, SERVER_URL.LOAD, onLoad, onError).send();
};

const upload = (onLoad, onError, data) => {
  createXhr(`POST`, SERVER_URL.UPLOAD, onLoad, onError).send(data);
};

window.backend = {
  load: load,
  upload: upload,
};


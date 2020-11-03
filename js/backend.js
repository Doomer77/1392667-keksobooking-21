'use strict';

const ServerURL = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};

const MessageText = {
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
      onError(MessageText.ERROR_LOAD);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(MessageText.ERROR_SERVER);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(MessageText.ERROR_TIMEOUT);
  });
  xhr.open(method, url);
  return xhr;
};

const load = (onLoad, onError) => createXhr(`GET`, ServerURL.LOAD, onLoad, onError).send();

const upload = (onLoad, onError, data) => createXhr(`POST`, ServerURL.UPLOAD, onLoad, onError).send(data);


window.backend = {
  load,
  upload
};


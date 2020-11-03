'use strict';

window.util = {
  mapPinMain: document.querySelector(`.map__pin--main`),

  KEY_NAME: {
    ENTER: `Enter`
  },

  PIN_SICE: {
    WIDTH: 65,
    HEIGHT: 84
  },

  onEscDown: (evt, popup) => {
    const KEY_ESC = `Escape`;
    if (popup === null) {
      return;
    }
    if (evt.key === KEY_ESC) {
      popup.remove();
    }
  },

  renderErrorMessage: (errorMessage) => {
    let message = document.createElement(`div`);
    message.classList.add(`error-message`);
    message.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, message);
  },

  debounce: (fun) => {
    let lastTimeout = null;
    let debounceInterval = 500;
    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        fun(...parameters);
      }, debounceInterval);
    };
  }
};


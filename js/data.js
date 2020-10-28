'use strict';

window.data = (function () {
  return {
    PINS_LIMIT: 5,
    TYPES_MAP: {
      PALACE: 'Дворец',
      FLAT: 'Квартира',
      HOUSE: 'Дом',
      BUNGALO: 'Бунгало'
    },
    DRAG_LIMIT: {
      X: {
        MIN: -30,
        MAX: 1230
      },
      Y: {
        MIN: 130,
        MAX: 680
      }
    },
    PIN_SICE: {
      WIDTH: 65,
      HEIGHT: 65,
    },
    DEFAULT_MAIN_PIN_X: 601,
    DEFAULT_MAIN_PIN_Y: 404,
    TAIL_HEIGHT: 16
  };
})();

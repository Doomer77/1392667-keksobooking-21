'use strict';

window.data = {
  PINS_LIMIT: 5,
  TYPES_MAP: {
    PALACE: `Дворец`,
    FLAT: `Квартира`,
    HOUSE: `Дом`,
    BUNGALO: `Бунгало`
  },
  PRICE_RANGE: {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
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
  TAIL_HEIGHT: 16,

  FILE_TYPES: [`gif`, `jpg`, `jpeg`, `png`],
  DEFAULT_AVATAR: `img/muffin-grey.svg`,

  IMAGE_PARAMS: {
    WIDTH: `70px`,
    HEIGHT: `70px`,
    BORDER_RADIUS: `5px`
  }
};


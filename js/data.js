'use strict';

window.data = (function () {
  return {
    AD_COUNT: 8,

    OFFER_DATA: {
      TITLES: [
        'Приют для потереных душ',
        'Дом на улице Вязов',
        'Райский уголок',
        'Квартира с усатой живностью',
        'Изысканный уют',
        'PecherSKY. Высоко над облаками',
        'Островок рая для свободного художника',
        'Роскошь, достойная султана'
      ],
      PRICE: {
        MAX: 150000,
        MIN: 20000
      },
      TYPES: [
        'palace',
        'flat',
        'house',
        'bungalow'
      ],
      ROOMS: {
        MIN: 1,
        MAX: 5
      },
      GUESTS: {
        MIN: 1,
        MAX: 6
      },
      CHECKIN: [
        '12:00',
        '13:00',
        '14:00'
      ],
      CHECKOUT: [
        '12:00',
        '13:00',
        '14:00'
      ],
      FEATURES: [
        "wifi",
        "dishwasher",
        "parking",
        "washer",
        "elevator",
        "conditioner"
      ],
      DESCRIPTIOS: [
        'Каждый уголок квартиры освещен светом добра и любви',
        'Интерьер выполнен в цветах земли и неба',
        'Элегантная квартира в неброских тонах',
        'Компактность, практичность и экономия',
        'В комнатах с высокими потолками легко дышится',
        'Из окон виден парк и река, где можно хорошо отдохнуть после трудового дня',
        'Из квартиры к машине на скоростном лифте – выбирайте комфорт!',
        'Квартира близко от метро, вы можете избавить себя от пробок'
      ],
      PHOTOS: [
        "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      ],
      LOCATION: {
        X: {
          MIN: 300,
          MAX: 900
        },
        Y: {
          MIN: 130,
          MAX: 630
        }
      },
      COORDINATES: {
        X: 600,
        Y: 350
      }
    },
    TYPES_MAP: {
      PALACE: 'Дворец',
      FLAT: 'Квартира',
      HOUSE: 'Дом',
      BUNGALO: 'Бунгало'
    },
    PIN: {
      WIDTH: 50,
      HEIGHT: 70
    },
    START_COORDINATES_PIN_MAIN: {
      TOP: '375px',
      LEFT: '570px'
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
    }
  };
})();

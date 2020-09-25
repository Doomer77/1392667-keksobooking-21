'use strict';

const OfferData = {
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
  }
};

let PIN = {
  WIDTH: 50,
  HEIGHT: 70
};

let adsArrey = [];
let template = document.querySelector('#pin');
let map = document.querySelector('.map');
let mapPins = document.querySelector('.map__pins');
let mapPinTemplate = template.content.querySelector('.map__pin');

const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getShuffleArray = (arrey) => {
  let copyArrey = arrey.slice(0);
  for (let i = 1; i < copyArrey.length; i++) {
    let j = Math.floor(Math.random() * (i - 1));
    let temp = copyArrey[i];
    copyArrey[i] = copyArrey[j];
    copyArrey[j] = temp;
  }
  return copyArrey;
};

const getRandomLengthArr = (arrey) => {
  let copyArrey = arrey.slice(0);
  let length = getRandomNumber(0, copyArrey.length);
  copyArrey.slice(0, length);
  return copyArrey;
};

const createAdObject = (i) => {
  let adObject = {
    autor: {
      avatar: `img/avatars/user${i < 10 ? '0' : ''}${i + 1}.png`,
    },
    offer: {
      title: OfferData.TITLES[i],
      price: getRandomNumber(OfferData.PRICE.MIN, OfferData.PRICE.MAX),
      type: OfferData.TYPES[getRandomNumber(0, OfferData.TYPES.length - 1)],
      rooms: getRandomNumber(OfferData.ROOMS.MAX, OfferData.ROOMS.MIN),
      guests: getRandomNumber(OfferData.GUESTS.MIN, OfferData.GUESTS.MAX),
      checkin: OfferData.CHECKIN[getRandomNumber(0, OfferData.CHECKIN.length - 1)],
      checkout: OfferData.CHECKOUT[getRandomNumber(0, OfferData.CHECKOUT.length - 1)],
      features: getRandomLengthArr(getShuffleArray(OfferData.FEATURES)),
      description: OfferData.DESCRIPTIOS[i],
      photos: getRandomLengthArr(getShuffleArray(OfferData.PHOTOS))
    },
    location: {
      x: getRandomNumber(OfferData.LOCATION.X.MIN, OfferData.LOCATION.X.MAX) - PIN.WIDTH / 2,
      y: getRandomNumber(OfferData.LOCATION.Y.MIN, OfferData.LOCATION.Y.MAX) - PIN.HEIGHT
    }
  };
  adObject.offer.address = `${adObject.location.x}, ${adObject.location.y}`;
  return adObject;
};

for (let k = 0; k < 8; k++) {
  adsArrey[k] = createAdObject(k);
}

map.classList.remove('map--faded');

const createPinMarkup = (pinData) => {
  let pin = mapPinTemplate.cloneNode(true);
  let pinImgAtr = pin.querySelector('img');
  pinImgAtr.src = pinData.autor.avatar;
  pinImgAtr.alt = pinData.offer.title;
  pin.style.left = `${pinData.location.x}px`;
  pin.style.top = `${pinData.location.y}px`;
  return pin;
};

const renderPinsMarkup = (pinsData) => {
  let pinFragment = document.createDocumentFragment();
  for (let j = 0; j < pinsData.length; j++) {
    pinFragment.appendChild(createPinMarkup(pinsData[j]));
  }
  mapPins.appendChild(pinFragment);
};

renderPinsMarkup(adsArrey);

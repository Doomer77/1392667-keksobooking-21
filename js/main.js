'use strict';

const AD_COUNT = 8;

const OFFER_DATA = {
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
};

const TYPES_MAP = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

const PIN = {
  WIDTH: 50,
  HEIGHT: 70
};

const monipulateElementDOM = (element, removeClass) => {
  const result = document.querySelector(element);
  if (removeClass) {
    return result.classList.remove(removeClass);
  }
  return result;
};

monipulateElementDOM('.map', 'map--faded');
const mapPins = monipulateElementDOM('.map__pins');
const mapFiltersContainer = monipulateElementDOM('.map__filters-container');
const templatePin = monipulateElementDOM('#pin');
const templateCard = monipulateElementDOM('#card');
const mapPinTemplate = templatePin.content.querySelector('.map__pin');
const mapCard = templateCard.content.querySelector('.map__card');
const popupPhoto = templateCard.content.querySelector('.popup__photo');


const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getShuffleArray = (array) => {
  let copyArray = array.slice(0);
  for (let i = copyArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = copyArray[i];
    copyArray[i] = copyArray[j];
    copyArray[j] = temp;
  }
  return copyArray;
};

const getRandomLengthArr = (array) => {
  let copyArray = array.slice(0);
  let length = getRandomNumber(0, copyArray.length);
  copyArray.slice(0, length);
  return copyArray;
};

const createAdObject = () => {
  let adsArray = [];
  for (let i = 0; i < AD_COUNT; i++) {
    adsArray.push({
      autor: {
        avatar: `img/avatars/user${i < AD_COUNT ? '0' : ''}${i + 1}.png`,
      },
      offer: {
        title: OFFER_DATA.TITLES[i],
        price: getRandomNumber(OFFER_DATA.PRICE.MIN, OFFER_DATA.PRICE.MAX),
        type: OFFER_DATA.TYPES[getRandomNumber(0, OFFER_DATA.TYPES.length - 1)],
        rooms: getRandomNumber(OFFER_DATA.ROOMS.MAX, OFFER_DATA.ROOMS.MIN),
        guests: getRandomNumber(OFFER_DATA.GUESTS.MIN, OFFER_DATA.GUESTS.MAX),
        checkin: OFFER_DATA.CHECKIN[getRandomNumber(0, OFFER_DATA.CHECKIN.length - 1)],
        checkout: OFFER_DATA.CHECKOUT[getRandomNumber(0, OFFER_DATA.CHECKOUT.length - 1)],
        features: getRandomLengthArr(getShuffleArray(OFFER_DATA.FEATURES)),
        description: OFFER_DATA.DESCRIPTIOS[i],
        photos: getRandomLengthArr(getShuffleArray(OFFER_DATA.PHOTOS))
      },
      location: {
        x: getRandomNumber(OFFER_DATA.LOCATION.X.MIN, OFFER_DATA.LOCATION.X.MAX),
        y: getRandomNumber(OFFER_DATA.LOCATION.Y.MIN, OFFER_DATA.LOCATION.Y.MAX)
      },
      address: `${OFFER_DATA.COORDINATES.X}, ${OFFER_DATA.COORDINATES.Y}`
    });
  }
  return adsArray;
};

let getAdsArray = createAdObject();

const createPinMarkup = (pinData) => {
  let pin = mapPinTemplate.cloneNode(true);
  let pinImgAtr = pin.querySelector('img');
  pinImgAtr.src = pinData.autor.avatar;
  pinImgAtr.alt = pinData.offer.title;
  pin.style.left = `${pinData.location.x - PIN.WIDTH / 2}px`;
  pin.style.top = `${pinData.location.y - PIN.HEIGHT}px`;
  return pin;
};

const renderPinsMarkup = (pinsData) => {
  let pinFragment = document.createDocumentFragment();
  for (let j = 0; j < pinsData.length; j++) {
    pinFragment.appendChild(createPinMarkup(pinsData[j]));
  }
  mapPins.appendChild(pinFragment);
};

renderPinsMarkup(createAdObject());

const createFeatureFragment = (dataAd) => {
  let featureFragment = document.createDocumentFragment();
  for (let f = 0; f < dataAd.offer.features.length; f++) {
    let featureItem = document.createElement('li');
    featureItem.className = `popup__feature popup__feature--${dataAd.offer.features[f]}`;
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

const createPhotosFragment = (dataAd) => {
  let photosFragment = document.createDocumentFragment();
  for (let ph = 0; ph < dataAd.offer.photos.length; ph++) {
    let popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = dataAd.offer.photos[ph];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
};

const createAd = (dataAd) => {
  let ad = mapCard.cloneNode(true);
  ad.querySelector('.popup__title').textContent = dataAd.offer.title;
  ad.querySelector('.popup__text--address').textContent = dataAd.address;
  ad.querySelector('.popup__text--price').textContent = `${dataAd.offer.price}₽/ночь`;
  ad.querySelector('.popup__type').textContent = TYPES_MAP[dataAd.offer.type];
  ad.querySelector('.popup__text--capacity').textContent = `${dataAd.offer.rooms} комнаты для ${dataAd.offer.guests} гостей`;
  ad.querySelector('.popup__text--time').textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;
  ad.querySelector('.popup__features').innerHTML = '';
  ad.querySelector('.popup__features').appendChild(createFeatureFragment(dataAd));
  ad.querySelector('.popup__description').textContent = dataAd.offer.description;
  ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
  ad.querySelector('.popup__photos').appendChild(createPhotosFragment(dataAd));
  ad.querySelector('.map__card .popup__avatar').src = dataAd.autor.avatar;
  return ad;
};

mapFiltersContainer.insertAdjacentElement('beforebegin', createAd(getAdsArray[0]));

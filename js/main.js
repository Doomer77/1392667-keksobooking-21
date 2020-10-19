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

const START_COORDINATES_PIN_MAIN = {
  TOP: '375px',
  LEFT: '570px'
};

const KEY_NAME = {
  ENTER: 'Enter',
  ESC: 'Escape'
};

const monipulateElementDOM = (element) => {
  const result = document.querySelector(element);
  return result;
};

const map = monipulateElementDOM('.map');
const mapPins = monipulateElementDOM('.map__pins');
const mapFiltersContainer = monipulateElementDOM('.map__filters-container');
const templatePin = monipulateElementDOM('#pin');
const templateCard = monipulateElementDOM('#card');
const mapPinTemplate = templatePin.content.querySelector('.map__pin');
const mapCard = templateCard.content.querySelector('.map__card');
const popupPhoto = templateCard.content.querySelector('.popup__photo');
const mapPinMain = monipulateElementDOM('.map__pin--main');
const adForm = monipulateElementDOM('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
const adFormHeader = adForm.querySelector('.ad-form-header');
const addressInput = adForm.querySelector('#address');
const typeInput = monipulateElementDOM('#type');
const priceInput = monipulateElementDOM('#price');
const timeInInput = monipulateElementDOM('#timein');
const timeOutInput = monipulateElementDOM('#timeout');
const roomNumberSelect = monipulateElementDOM('#room_number');
const capacitySelect = monipulateElementDOM('#capacity');
const submitBtn = monipulateElementDOM('.ad-form__submit');
const isActivate = false;

const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getShuffleArray = (array) => {
  let copyArray = array.slice(0);
  for (let i = 0; i < copyArray.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = copyArray[i];
    copyArray[i] = copyArray[j];
    copyArray[j] = temp;
  }
  return copyArray;
};

const getRandomLengthArr = (array) => {
  let copyArray = array.slice(0);
  let length = getRandomNumber(0, copyArray.length + 1);
  let copy = copyArray.slice(0, length);
  return copy;
};

const onEscDown = (evt, popup) => {
  if (popup === null) {
    return;
  }
  if (evt.key === KEY_NAME.ESC) {
    popup.remove();
  }
};

const createAdObject = () => {
  let adsArray = [];
  for (let i = 0; i < AD_COUNT; i++) {
    adsArray.push({
      autor: {
        avatar: `img/avatars/user${i < AD_COUNT ? '0' : ''}${i + 1}.png`,
      },
      offer: {
        title: OFFER_DATA.TITLES[getRandomNumber(OFFER_DATA.TITLES.length - 1, 0)],
        price: getRandomNumber(OFFER_DATA.PRICE.MIN, OFFER_DATA.PRICE.MAX),
        type: OFFER_DATA.TYPES[getRandomNumber(OFFER_DATA.TYPES.length - 1, 0)],
        rooms: getRandomNumber(OFFER_DATA.ROOMS.MAX, OFFER_DATA.ROOMS.MIN),
        guests: getRandomNumber(OFFER_DATA.GUESTS.MIN, OFFER_DATA.GUESTS.MAX),
        checkin: OFFER_DATA.CHECKIN[getRandomNumber(OFFER_DATA.CHECKIN.length - 1, 0)],
        checkout: OFFER_DATA.CHECKOUT[getRandomNumber(OFFER_DATA.CHECKOUT.length - 1, 0)],
        features: getRandomLengthArr(getShuffleArray(OFFER_DATA.FEATURES)),
        description: OFFER_DATA.DESCRIPTIOS[getRandomNumber(OFFER_DATA.DESCRIPTIOS.length - 1, 0)],
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

const getAdsArray = createAdObject();

const createPinMarkup = (pinData) => {
  let pin = mapPinTemplate.cloneNode(true);
  let pinImgAtr = pin.querySelector('img');
  pinImgAtr.src = pinData.autor.avatar;
  pinImgAtr.alt = pinData.offer.title;
  pin.style.left = `${pinData.location.x - PIN.WIDTH}px`;
  pin.style.top = `${pinData.location.y - PIN.HEIGHT}px`;
  pin.addEventListener('click', () => {
    let mapCardMain = map.querySelector('.map__card');
    if (mapCardMain) {
      mapCardMain.remove();
    }
    createAd(pinData);
    document.addEventListener('keydown', (evt) => {
      onEscDown(evt, map.querySelector('.map__card'));
    });
  });
  return pin;
};

const renderPinsMarkup = (pinsData) => {
  let pinFragment = document.createDocumentFragment();
  for (let j = 0; j < pinsData.length; j++) {
    pinFragment.appendChild(createPinMarkup(pinsData[j]));
  }
  mapPins.appendChild(pinFragment);
};

const createFeatureFragment = (features) => {
  let featureFragment = document.createDocumentFragment();
  for (let f = 0; f < features.length; f++) {
    let featureItem = document.createElement('li');
    featureItem.className = `popup__feature popup__feature--${features[f]}`;
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

const createPhotosFragment = (photos) => {
  let photosFragment = document.createDocumentFragment();
  for (let ph = 0; ph < photos.length; ph++) {
    let popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = photos[ph];
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
  ad.querySelector('.popup__features').appendChild(createFeatureFragment(dataAd.offer.features));
  ad.querySelector('.popup__description').textContent = dataAd.offer.description;
  ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
  ad.querySelector('.popup__photos').appendChild(createPhotosFragment(dataAd.offer.photos));
  ad.querySelector('.map__card .popup__avatar').src = dataAd.autor.avatar;
  mapFiltersContainer.insertAdjacentElement('beforebegin', ad);
  let closeAd = ad.querySelector('.popup__close');
  closeAd.addEventListener('click', () => {
    ad.remove();
    document.removeEventListener('click', onEscDown);
  });
  return ad;
};

const getStartingCoordMapPinMain = () => {
  addressInput.value = `${(mapPinMain.offsetTop - mapPinMain.offsetHeight / 2)}, ${(mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2)}`;
};
getStartingCoordMapPinMain();

const fillAddress = () => {
  addressInput.value = `${(mapPinMain.offsetTop + PIN.HEIGHT)}, ${(mapPinMain.offsetLeft + PIN.WIDTH / 2)}`;
};

const checkNotActivity = () => {
  adFormHeader.disabled = true;
  for (let field = 0; field < adFormFieldsets.length; field++) {
    adFormFieldsets[field].disabled = true;
  }
};
checkNotActivity();

const activateForm = () => {
  if (!isActivate) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (let i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].removeAttribute('disabled', 'disabled');
    }
    adFormHeader.disabled = false;
  }
  fillAddress();
};

mapPinMain.addEventListener('keydown', (evt) => {
  if (evt.key === KEY_NAME.ENTER) {
    activateForm();
    renderPinsMarkup(getAdsArray);
  }
});

const activateFormMouseDown = (evt) => {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case 0:
        activateForm();
        renderPinsMarkup(getAdsArray);
        break;
    }
  }
};

mapPinMain.addEventListener('mousedown', activateFormMouseDown);

const deactivationForm = () => {
  let mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  adForm.reset();
  for (let i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = true;
  }
  adFormHeader.disabled = true;
  for (let j = 0; j < mapPinsItems.length; j++) {
    mapPinsItems[j].remove();
  }
  if (map.querySelector('.map__card')) {
    map.querySelector('.map__card').remove();
  }
  mapPinMain.top = START_COORDINATES_PIN_MAIN.TOP;
  mapPinMain.left = START_COORDINATES_PIN_MAIN.LEFT;
  getStartingCoordMapPinMain();
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
};

typeInput.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case 'bungalow':
      priceInput.min = 0;
      priceInput.placeholder = '0';
      break;
    case 'flat':
      priceInput.min = 1000;
      priceInput.placeholder = '1000';
      break;
    case 'house':
      priceInput.min = 5000;
      priceInput.placeholder = '5000';
      break;
    case 'palace':
      priceInput.min = 10000;
      priceInput.placeholder = '10000';
      break;
  }
});

timeInInput.addEventListener('change', (evt) => {
  timeOutInput.value = evt.target.value;
});

timeOutInput.addEventListener('change', (evt) => {
  timeInInput.value = evt.target.value;
});

const ROOMS_COUNT = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const disableСapacityOptions = (inputValue) => {
  let capacityOptions = capacitySelect.querySelectorAll('option');
  for (let t = 0; t < capacityOptions.length; t++) {
    capacityOptions[t].disabled = true;
  }
  for (let r = 0; r < ROOMS_COUNT[inputValue].length; r++) {
    capacitySelect.querySelector(`${'option'}${'[value="'}${ROOMS_COUNT[inputValue][r]}${'"]'}`).disabled = false;
    capacitySelect.value = ROOMS_COUNT[inputValue][r];
  }
};

roomNumberSelect.addEventListener('change', () => {
  disableСapacityOptions(roomNumberSelect.value);
});

roomNumberSelect.addEventListener('change', (evt) => {
  evt.target.setCustomValidity('');
});

capacitySelect.addEventListener('change', (evt) => {
  evt.target.setCustomValidity('');
});

submitBtn.addEventListener('click', () => {
  checkPlaceValidity();
});

const checkPlaceValidity = () => {
  let roomGuests = ROOMS_COUNT[roomNumberSelect.value];
  if (roomGuests.indexOf(+capacitySelect.value) === -1) {
    capacitySelect.setCustomValidity('Количество гостей не влезут в выбранную комнату');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

adForm.addEventListener('submit', () => {
  deactivationForm();
});

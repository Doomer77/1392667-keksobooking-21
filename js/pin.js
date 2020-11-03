'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const templatePin = document.querySelector(`#pin`);
const templateCard = document.querySelector(`#card`);
const mapPinTemplate = templatePin.content.querySelector(`.map__pin`);
const mapCard = templateCard.content.querySelector(`.map__card`);
const popupPhoto = templateCard.content.querySelector(`.popup__photo`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const DEFAULT_MAIN_PIN_X = 601;
const DEFAULT_MAIN_PIN_Y = 404;
const HousingTypes = {
  PALACE: `Дворец`,
  FLAT: `Квартира`,
  HOUSE: `Дом`,
  BUNGALO: `Бунгало`
};
const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const onMapPinMainMouseDown = (evt) => {
  if (typeof evt === `object`) {
    switch (evt.button) {
      case 0:
        window.map.activateMap();
        window.form.activateForm();
        window.util.mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
        break;
    }
  }
};

const removePins = () => {
  const mapPinsItems = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let j = 0; j < mapPinsItems.length; j++) {
    mapPinsItems[j].remove();
  }
};

const removeMapCard = () => {
  let mapCardRemove = document.querySelector(`.map__card`);
  if (mapCardRemove) {
    mapCardRemove.remove();
  }
};

const deactivateMap = () => {
  map.classList.add(`map--faded`);
  removePins();
  removeMapCard();
  window.util.mapPinMain.style.top = `${DEFAULT_MAIN_PIN_Y - window.util.PIN_SICE.HEIGHT / 2}px`;
  window.util.mapPinMain.style.left = `${DEFAULT_MAIN_PIN_X - window.util.PIN_SICE.WIDTH / 2}px`;
  window.util.mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);
};
deactivateMap();

const onLoadSuccess = (adData) => window.filter.activateFiltration(adData);

const onLoadError = (errorMessage) => window.util.renderErrorMessage(errorMessage);

const activateMap = () => {
  window.backend.load(onLoadSuccess, onLoadError);
  map.classList.remove(`map--faded`);
};

const createPinMarkup = (pinData) => {
  let pin = mapPinTemplate.cloneNode(true);
  let pinImgAtr = pin.querySelector(`img`);
  pinImgAtr.src = pinData.author.avatar;
  pinImgAtr.alt = pinData.offer.title;
  let {WIDTH, HEIGHT} = Pin;
  pin.style.left = `${pinData.location.x - WIDTH / 2}px`;
  pin.style.top = `${pinData.location.y - HEIGHT}px`;
  pin.addEventListener(`click`, () => {
    let mapCardMain = map.querySelector(`.map__card`);
    if (mapCardMain) {
      mapCardMain.remove();
    }
    createAd(pinData);
    document.addEventListener(`keydown`, (evt) => {
      window.util.onEscDown(evt, map.querySelector(`.map__card`));
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
    let featureItem = document.createElement(`li`);
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
  let {PALACE, FLAT, HOUSE, BUNGALO} = HousingTypes;
  let ad = mapCard.cloneNode(true);
  ad.querySelector(`.popup__title`).textContent = dataAd.offer.title;
  ad.querySelector(`.popup__text--address`).textContent = dataAd.offer.address;
  ad.querySelector(`.popup__text--price`).textContent = `${dataAd.offer.price}₽/ночь`;
  if (dataAd.offer.type === `palace`) {
    ad.querySelector(`.popup__type`).textContent = PALACE;
  } else if (dataAd.offer.type === `flat`) {
    ad.querySelector(`.popup__type`).textContent = FLAT;
  } else if (dataAd.offer.type === `house`) {
    ad.querySelector(`.popup__type`).textContent = HOUSE;
  } else {
    ad.querySelector(`.popup__type`).textContent = BUNGALO;
  }
  ad.querySelector(`.popup__text--capacity`).textContent = `${dataAd.offer.rooms} комнаты для ${dataAd.offer.guests} гостей`;
  ad.querySelector(`.popup__text--time`).textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;
  ad.querySelector(`.popup__features`).innerHTML = ``;
  ad.querySelector(`.popup__features`).appendChild(createFeatureFragment(dataAd.offer.features));
  ad.querySelector(`.popup__description`).textContent = dataAd.offer.description;
  ad.querySelector(`.popup__photos`).removeChild(ad.querySelector(`.popup__photo`));
  ad.querySelector(`.popup__photos`).appendChild(createPhotosFragment(dataAd.offer.photos));
  ad.querySelector(`.map__card .popup__avatar`).src = dataAd.author.avatar;
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, ad);
  let closeAd = ad.querySelector(`.popup__close`);
  closeAd.addEventListener(`click`, () => {
    ad.remove();
    document.removeEventListener(`click`, window.util.onEscDown);
  });
  return ad;
};

const getMainPinDefaultCoords = () => {
  return {
    x: DEFAULT_MAIN_PIN_X,
    y: DEFAULT_MAIN_PIN_Y
  };
};

window.map = {
  getMainPinDefaultCoords,
  removePins,
  removeMapCard,
  activateMap,
  deactivateMap,
  renderPinsMarkup
};

'use strict';

(function () {
  const map = window.util.monipulateElementDOM('.map');
  const mapPins = window.util.monipulateElementDOM('.map__pins');
  const templatePin = window.util.monipulateElementDOM('#pin');
  const templateCard = window.util.monipulateElementDOM('#card');
  const mapPinTemplate = templatePin.content.querySelector('.map__pin');
  const mapCard = templateCard.content.querySelector('.map__card');
  const popupPhoto = templateCard.content.querySelector('.popup__photo');
  const mapFiltersContainer = window.util.monipulateElementDOM('.map__filters-container');
  const mapPinMain = window.util.monipulateElementDOM('.map__pin--main');

  const onMapPinMainMouseDown = () => {
    window.map.activate();
    window.form.activate();
    mapPinMain.removeEventListener('mousedown', onMapPinMainMouseDown);
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);

  const deactivateMap = () => {
    map.classList.add('map--faded');
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapCard) {
      mapCard.remove();
    }
    for (let j = 0; j < mapPinsItems.length; j++) {
      mapPinsItems[j].remove();
    }
    mapPinMain.style.top = window.data.DEFAULT_MAIN_PIN_Y - window.data.PIN_SICE.HEIGHT / 2 + 'px';
    mapPinMain.style.left = window.data.DEFAULT_MAIN_PIN_X - window.data.PIN_SICE.WIDTH / 2 + 'px';
    mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  };

  deactivateMap();

  const onLoadSuccess = (adData) => {
    window.renderPinsMarkup(adData);
  };

  const onLoadError = (errorMessage) => {
    window.util.renderErrorMessage(errorMessage);
  };

  const activateMap = () => {
    window.backend.load(onLoadSuccess, onLoadError);
    map.classList.remove('map--faded');
  };


  const createPinMarkup = (pinData) => {
    let pin = mapPinTemplate.cloneNode(true);
    let pinImgAtr = pin.querySelector('img');
    pinImgAtr.src = pinData.author.avatar;
    pinImgAtr.alt = pinData.offer.title;
    pin.style.left = `${pinData.location.x}px`;
    pin.style.top = `${pinData.location.y}px`;
    pin.addEventListener('click', () => {
      let mapCardMain = map.querySelector('.map__card');
      if (mapCardMain) {
        mapCardMain.remove();
      }
      createAd(pinData);
      document.addEventListener('keydown', (evt) => {
        window.util.onEscDown(evt, map.querySelector('.map__card'));
      });
    });
    return pin;
  };

  window.renderPinsMarkup = (pinsData) => {
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
    ad.querySelector('.popup__text--address').textContent = dataAd.offer.address;
    ad.querySelector('.popup__text--price').textContent = `${dataAd.offer.price}₽/ночь`;
    if (dataAd.offer.type === 'palace') {
      ad.querySelector('.popup__type').textContent = window.data.TYPES_MAP.PALACE;
    } else if (dataAd.offer.type === 'flat') {
      ad.querySelector('.popup__type').textContent = window.data.TYPES_MAP.FLAT;
    } else if (dataAd.offer.type === 'house') {
      ad.querySelector('.popup__type').textContent = window.data.TYPES_MAP.HOUSE;
    } else {
      ad.querySelector('.popup__type').textContent = window.data.TYPES_MAP.BUNGALO;
    }
    ad.querySelector('.popup__text--capacity').textContent = `${dataAd.offer.rooms} комнаты для ${dataAd.offer.guests} гостей`;
    ad.querySelector('.popup__text--time').textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;
    ad.querySelector('.popup__features').innerHTML = '';
    ad.querySelector('.popup__features').appendChild(createFeatureFragment(dataAd.offer.features));
    ad.querySelector('.popup__description').textContent = dataAd.offer.description;
    ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
    ad.querySelector('.popup__photos').appendChild(createPhotosFragment(dataAd.offer.photos));
    ad.querySelector('.map__card .popup__avatar').src = dataAd.author.avatar;
    mapFiltersContainer.insertAdjacentElement('beforebegin', ad);
    let closeAd = ad.querySelector('.popup__close');
    closeAd.addEventListener('click', () => {
      ad.remove();
      document.removeEventListener('click', window.util.onEscDown);
    });
    return ad;
  };
  window.map = {
    getMainPinDefaultCoords: function () {
      return {
        x: window.data.DEFAULT_MAIN_PIN_X,
        y: window.data.DEFAULT_MAIN_PIN_Y
      };
    },
    activate: activateMap,
    deactivate: deactivateMap
  };
})();

'use strict';

(function () {
  const map = window.util.monipulateElementDOM('.map');
  const mapPinMain = window.util.monipulateElementDOM('.map__pin--main');
  const adForm = window.util.monipulateElementDOM('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  const adFormHeader = adForm.querySelector('.ad-form-header');
  const addressInput = adForm.querySelector('#address');
  const typeInput = window.util.monipulateElementDOM('#type');
  const priceInput = window.util.monipulateElementDOM('#price');
  const timeInInput = window.util.monipulateElementDOM('#timein');
  const timeOutInput = window.util.monipulateElementDOM('#timeout');
  const roomNumberSelect = window.util.monipulateElementDOM('#room_number');
  const capacitySelect = window.util.monipulateElementDOM('#capacity');
  const submitBtn = window.util.monipulateElementDOM('.ad-form__submit');
  const isActivate = false;

  const getStartingCoordMapPinMain = () => {
    addressInput.value = `${(mapPinMain.offsetTop - mapPinMain.offsetHeight / 2)}, ${(mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2)}`;
  };
  getStartingCoordMapPinMain();

  const getBaseCoordinatesMapPinMain = () => {
    let mapPinMainPosition = {
      x: mapPinMain.offsetLeft + Math.floor(mapPinMain.offsetWidth / 2),
      y: mapPinMain.offsetTop + mapPinMain.offsetHeight
    };
    return mapPinMainPosition;
  };

  const fillAddress = () => {
    let addressInputCoords = getBaseCoordinatesMapPinMain();
    addressInput.value = `${addressInputCoords.x} ${addressInputCoords.y}`;
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
    if (evt.key === window.util.KEY_NAME.ENTER) {
      activateForm();
      window.renderPinsMarkup(window.getAdsArray);
    }
  });

  const activateFormMouseDown = (evt) => {
    if (typeof evt === 'object') {
      switch (evt.button) {
        case 0:
          activateForm();
          window.renderPinsMarkup(window.getAdsArray);
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
    mapPinMain.top = window.data.START_COORDINATES_PIN_MAIN.TOP;
    mapPinMain.left = window.data.START_COORDINATES_PIN_MAIN.LEFT;
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

  mapPinMain.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      let movementData = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      let mapPinMainPosition = {
        x: mapPinMain.offsetLeft - movementData.x,
        y: mapPinMain.offsetTop - movementData.y
      };
      const BORDER = {
        TOP: window.data.DRAG_LIMIT.Y.MIN - mapPinMain.offsetHeight,
        BOTTOM: window.data.DRAG_LIMIT.Y.MAX - mapPinMain.offsetHeight,
        LEFT: window.data.DRAG_LIMIT.X.MIN,
        RIGHT: window.data.DRAG_LIMIT.X.MAX - mapPinMain.offsetWidth
      };
      if (mapPinMainPosition.x >= BORDER.LEFT && mapPinMainPosition.x <= BORDER.RIGHT) {
        mapPinMain.style.left = `${mapPinMainPosition.x}px`;
      }
      if (mapPinMainPosition.y >= BORDER.TOP && mapPinMainPosition.y <= BORDER.BOTTOM) {
        mapPinMain.style.top = `${mapPinMainPosition.y}px`;
      }
      fillAddress();
    };
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  adForm.addEventListener('submit', () => {
    deactivationForm();
  });
})();

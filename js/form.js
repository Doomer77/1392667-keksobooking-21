'use strict';

(function () {
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

  window.fillAddress = () => {
    let addressInputCoords = getBaseCoordinatesMapPinMain();
    addressInput.value = `${addressInputCoords.x} ${addressInputCoords.y}`;
  };

  const activateForm = () => {
    adForm.classList.remove('ad-form--disabled');
    for (let i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = false;
    }
    adFormHeader.disabled = false;
    window.fillAddress();
  };

  mapPinMain.addEventListener('keydown', (evt) => {
    if (evt.key === window.util.KEY_NAME.ENTER) {
      window.map.activate();
      window.form.activate();
      window.fillAddress();
    }
  });

  // const activateFormMouseDown = (evt) => {
  //   if (typeof evt === 'object') {
  //     switch (evt.button) {
  //       case 0:
  //         window.map.activate();
  //         window.form.activate();
  //         break;
  //     }
  //   }
  // };

  // mapPinMain.addEventListener('mousedown', activateFormMouseDown);

  const deactivationForm = () => {
    adForm.reset();
    for (let i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = true;
    }
    adFormHeader.disabled = true;
    var defaultCoords = window.map.getMainPinDefaultCoords();
    getStartingCoordMapPinMain(defaultCoords);
    adForm.classList.add('ad-form--disabled');
  };

  deactivationForm();

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

  window.form = {
    setAddress: window.fillAddress,
    activate: activateForm,
    deactivate: deactivationForm
  };
})();

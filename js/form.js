'use strict';

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`.ad-form__element`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const addressInput = adForm.querySelector(`#address`);
const typeInput = document.querySelector(`#type`);
const priceInput = document.querySelector(`#price`);
const timeInInput = document.querySelector(`#timein`);
const timeOutInput = document.querySelector(`#timeout`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const submitBtn = document.querySelector(`.ad-form__submit`);
const main = document.querySelector(`main`);
const successTemplate = document.querySelector(`#success`);
const successMassege = successTemplate.content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`);
const errorsMassege = errorTemplate.content.querySelector(`.error`);
const errorsBtn = errorTemplate.content.querySelector(`.error__button`);
const resetBtn = document.querySelector(`.ad-form__reset`);
const RoomsCount = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};


const getStartingCoordMapPinMain = () => {
  addressInput.value = `${Math.floor(window.util.mapPinMain.offsetLeft) - Math.floor(window.util.mapPinMain.offsetWidth / 2)}, ${Math.floor(window.util.mapPinMain.offsetTop) - Math.floor(window.util.mapPinMain.offsetHeight / 2)}`;
};
getStartingCoordMapPinMain();

const getBaseCoordinatesMapPinMain = () => {
  let mapPinMainPosition = {
    x: window.util.mapPinMain.offsetLeft + Math.floor(window.util.PIN_SICE.WIDTH / 2),
    y: window.util.mapPinMain.offsetTop + window.util.PIN_SICE.HEIGHT
  };
  return mapPinMainPosition;
};

const fillAddress = () => {
  let addressInputCoords = getBaseCoordinatesMapPinMain();
  addressInput.value = `${addressInputCoords.x} ${addressInputCoords.y}`;
};

const activateForm = () => {
  adForm.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = false;
  }
  adFormHeader.disabled = false;
  adForm.disabled = false;
  fillAddress();
  window.loadImage.activate();
};

window.util.mapPinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === window.util.KEY_NAME.ENTER) {
    window.map.activateMap();
    window.form.activateForm();
    fillAddress();
  }
});

const deactivationForm = () => {
  adForm.reset();
  for (let i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = true;
  }
  adFormHeader.disabled = true;
  adForm.disabled = true;
  let defaultCoords = window.map.getMainPinDefaultCoords();
  getStartingCoordMapPinMain(defaultCoords);
  adForm.classList.add(`ad-form--disabled`);
  window.loadImage.deactivate();
  window.loadImage.removeImages();
};
deactivationForm();

typeInput.addEventListener(`change`, (evt) => {
  switch (evt.target.value) {
    case `bungalow`:
      priceInput.min = 0;
      priceInput.placeholder = `0`;
      break;
    case `flat`:
      priceInput.min = 1000;
      priceInput.placeholder = `1000`;
      break;
    case `house`:
      priceInput.min = 5000;
      priceInput.placeholder = `5000`;
      break;
    case `palace`:
      priceInput.min = 10000;
      priceInput.placeholder = `10000`;
      break;
  }
});

timeInInput.addEventListener(`change`, (evt) => {
  timeOutInput.value = evt.target.value;
});

timeOutInput.addEventListener(`change`, (evt) => {
  timeInInput.value = evt.target.value;
});

const disableСapacityOptions = (inputValue) => {
  let capacityOptions = capacitySelect.querySelectorAll(`option`);
  for (let t = 0; t < capacityOptions.length; t++) {
    capacityOptions[t].disabled = true;
  }
  for (let r = 0; r < RoomsCount[inputValue].length; r++) {
    capacitySelect.querySelector(`${`option`}${`[value="`}${RoomsCount[inputValue][r]}${`"]`}`).disabled = false;
    capacitySelect.value = RoomsCount[inputValue][r];
  }
};

roomNumberSelect.addEventListener(`change`, () => {
  disableСapacityOptions(roomNumberSelect.value);
});

roomNumberSelect.addEventListener(`change`, (evt) => {
  evt.target.setCustomValidity(``);
});

capacitySelect.addEventListener(`change`, (evt) => {
  evt.target.setCustomValidity(``);
});

submitBtn.addEventListener(`click`, () => {
  checkPlaceValidity();
});

const checkPlaceValidity = () => {
  let roomGuests = RoomsCount[roomNumberSelect.value];
  if (roomGuests.indexOf(+capacitySelect.value) === -1) {
    capacitySelect.setCustomValidity(`Количество гостей не влезут в выбранную комнату`);
  } else {
    capacitySelect.setCustomValidity(``);
  }
};

const showSuccessMassege = () => {
  main.appendChild(successMassege);
  window.addEventListener(`keydown`, (evt) => {
    if (window.util.onEscDown(evt, successMassege)) {
      successMassege.remove();
    }
  });
  document.addEventListener(`click`, () => {
    successMassege.remove();
  });
};

const showErrorMassege = () => {
  main.appendChild(errorsMassege);
  window.addEventListener(`keydown`, (evt) => {
    if (window.util.onEscDown(evt, errorsMassege)) {
      errorsMassege.remove();
    }
  });
  document.addEventListener(`click`, () => {
    errorsMassege.remove();
  });
  errorsBtn.addEventListener(`click`, () => {
    errorsMassege.remove();
  });
};

const onSubmitSuccess = () => {
  showSuccessMassege();
  window.map.deactivateMap();
  window.form.deactivationForm();
  window.filter.deactivateFiltration();
};

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  let formData = new FormData(adForm);
  window.backend.upload(onSubmitSuccess, showErrorMassege, formData);
});

resetBtn.addEventListener(`click`, () => {
  window.map.deactivate();
  window.form.deactivationForm();
  window.filter.deactivateFiltration();
  window.loadImage.removeImages();
});

window.form = {
  activateForm,
  deactivationForm
};

window.address = {
  fillAddress
};


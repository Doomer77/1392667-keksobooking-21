'use strict';

const TAIL_HEIGHT = 16;
const DragLimit = {
  X: {
    MIN_X: -32,
    MAX_X: 1233
  },
  Y: {
    MIN_Y: 130,
    MAX_Y: 630
  }
};

let {X: {MIN_X, MAX_X}, Y: {MIN_Y, MAX_Y}} = DragLimit;
window.util.mapPinMain.addEventListener(`mousedown`, (evt) => {
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
      x: window.util.mapPinMain.offsetLeft - movementData.x,
      y: window.util.mapPinMain.offsetTop - movementData.y
    };
    const BORDER = {
      TOP: MIN_Y - window.util.mapPinMain.offsetHeight,
      BOTTOM: MAX_Y - window.util.mapPinMain.offsetHeight,
      LEFT: MIN_X,
      RIGHT: MAX_X - window.util.mapPinMain.offsetWidth
    };
    if (mapPinMainPosition.x >= BORDER.LEFT && mapPinMainPosition.x <= BORDER.RIGHT) {
      window.util.mapPinMain.style.left = `${mapPinMainPosition.x}px`;
    }
    if (mapPinMainPosition.y >= BORDER.TOP && mapPinMainPosition.y <= BORDER.BOTTOM) {
      window.util.mapPinMain.style.top = `${mapPinMainPosition.y}px`;
    }
    let pinTailCoords = {
      x: mapPinMainPosition.x + Math.ceil(window.util.PIN_SICE.WIDTH / 2),
      y: mapPinMainPosition.y + window.util.PIN_SICE.HEIGHT + TAIL_HEIGHT
    };
    window.form.fillAddress(pinTailCoords);
  };
  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

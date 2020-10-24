'use strict';

(function () {
  const mapPinMain = window.util.monipulateElementDOM('.map__pin--main');
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
      let pinTailCoords = {
        x: mapPinMainPosition.x + Math.ceil(window.data.PIN_SICE.WIDTH / 2),
        y: mapPinMainPosition.y + window.data.PIN_SICE.HEIGHT + window.data.TAIL_HEIGHT
      };
      window.form.setAddress(pinTailCoords);
    };
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

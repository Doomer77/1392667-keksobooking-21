'use strict';

window.util = (function () {
  return {
    KEY_NAME: {
      ENTER: 'Enter',
      ESC: 'Escape'
    },
    monipulateElementDOM: function (element) {
      const result = document.querySelector(element);
      return result;
    },
    getRandomNumber: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getShuffleArray: function (array) {
      let copyArray = array.slice(0);
      for (let i = 0; i < copyArray.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = copyArray[i];
        copyArray[i] = copyArray[j];
        copyArray[j] = temp;
      }
      return copyArray;
    },
    getRandomLengthArr: function (array) {
      let copyArray = array.slice(0);
      let length = window.util.getRandomNumber(0, copyArray.length + 1);
      let copy = copyArray.slice(0, length);
      return copy;
    },
    onEscDown: function (evt, popup) {
      if (popup === null) {
        return;
      }
      if (evt.key === this.KEY_NAME.ESC) {
        popup.remove();
      }
    }
  };
})();
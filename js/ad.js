'use strict';

(function () {
  const createAdObject = () => {
    let adsArray = [];
    for (let i = 0; i < window.data.AD_COUNT; i++) {
      adsArray.push({
        autor: {
          avatar: `img/avatars/user${i < window.data.AD_COUNT ? '0' : ''}${i + 1}.png`,
        },
        offer: {
          title: window.data.OFFER_DATA.TITLES[window.util.getRandomNumber(window.data.OFFER_DATA.TITLES.length - 1, 0)],
          price: window.util.getRandomNumber(window.data.OFFER_DATA.PRICE.MIN, window.data.OFFER_DATA.PRICE.MAX),
          type: window.data.OFFER_DATA.TYPES[window.util.getRandomNumber(window.data.OFFER_DATA.TYPES.length - 1, 0)],
          rooms: window.util.getRandomNumber(window.data.OFFER_DATA.ROOMS.MAX, window.data.OFFER_DATA.ROOMS.MIN),
          guests: window.util.getRandomNumber(window.data.OFFER_DATA.GUESTS.MIN, window.data.OFFER_DATA.GUESTS.MAX),
          checkin: window.data.OFFER_DATA.CHECKIN[window.util.getRandomNumber(window.data.OFFER_DATA.CHECKIN.length - 1, 0)],
          checkout: window.data.OFFER_DATA.CHECKOUT[window.util.getRandomNumber(window.data.OFFER_DATA.CHECKOUT.length - 1, 0)],
          features: window.util.getRandomLengthArr(window.util.getShuffleArray(window.data.OFFER_DATA.FEATURES)),
          description: window.data.OFFER_DATA.DESCRIPTIOS[window.util.getRandomNumber(window.data.OFFER_DATA.DESCRIPTIOS.length - 1, 0)],
          photos: window.util.getRandomLengthArr(window.util.getShuffleArray(window.data.OFFER_DATA.PHOTOS))
        },
        location: {
          x: window.util.getRandomNumber(window.data.OFFER_DATA.LOCATION.X.MIN, window.data.OFFER_DATA.LOCATION.X.MAX),
          y: window.util.getRandomNumber(window.data.OFFER_DATA.LOCATION.Y.MIN, window.data.OFFER_DATA.LOCATION.Y.MAX)
        },
        address: `${window.data.OFFER_DATA.COORDINATES.X}, ${window.data.OFFER_DATA.COORDINATES.Y}`
      });
    }

    return adsArray;
  };
  window.getAdsArray = createAdObject();
})();

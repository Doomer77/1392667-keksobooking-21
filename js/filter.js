'use strict';

const filter = document.querySelector(`.map__filters`);
const filterItems = filter.querySelectorAll(`select, input`);
const typeSelect = filter.querySelector(`#housing-type`);
const priceSelect = filter.querySelector(`#housing-price`);
const roomsSelect = filter.querySelector(`#housing-rooms`);
const guestsSelect = filter.querySelector(`#housing-guests`);
const featuresFieldset = filter.querySelector(`#housing-features`);
let data = [];
let filteredData = [];
const PINS_LIMIT = 5;
const PriceRange = {
  LOW: {
    MIN: 0,
    MAX: 10000
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000
  },
  HIGH: {
    MIN: 50000,
    MAX: Infinity
  }
};

const filtrationItem = (it, item, key) => it.value === `any` ? true : it.value === item[key].toString();

const filtrationByType = (item) => filtrationItem(typeSelect, item.offer, `type`);

const filtrationByPrice = (item) => {
  let filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
  return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
};

const filtrationByRooms = (item) => filtrationItem(roomsSelect, item.offer, `rooms`);

const filtrationByGuests = (item) => filtrationItem(guestsSelect, item.offer, `guests`);


const filtrationByFeatures = (item) => {
  let checkedFeaturesItems = featuresFieldset.querySelectorAll(`input:checked`);
  return Array.from(checkedFeaturesItems).every((element) => {
    return item.offer.features.includes(element.value);
  });
};

const onFilterChange = window.util.debounce(() => {
  filteredData = data.slice(0);
  filteredData = filteredData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
  window.map.removePins();
  window.map.removeMapCard();
  window.map.renderPinsMarkup(filteredData.slice(0, PINS_LIMIT));
});

const activateFilter = () => {
  filter.disabled = false;
  filterItems.forEach((it) => {
    it.disabled = false;
  });
  onFilterChange();
  filter.addEventListener(`change`, onFilterChange);
};

const resetFilter = () => {
  filterItems.forEach((it) => {
    it.value = `any`;
  });
  let featuresItems = featuresFieldset.querySelectorAll(`input`);
  featuresItems.forEach((feature) => {
    feature.checked = false;
  });
};

const deactivateFilter = () => {
  filter.disabled = true;
  filterItems.forEach((it) => {
    it.disabled = true;
  });
  resetFilter();
  filter.removeEventListener(`change`, onFilterChange);
};

const activateFiltration = (adData) => {
  data = adData.slice(0);
  activateFilter();
  return adData.slice(0, PINS_LIMIT);
};

const deactivateFiltration = () => deactivateFilter();


window.filter = {
  activateFiltration,
  deactivateFiltration
};

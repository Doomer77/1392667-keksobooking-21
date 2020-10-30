'use strict';

const filter = window.util.monipulateElementDOM(`.map__filters`);
const filterItems = filter.querySelectorAll(`select, input`);
const typeSelect = filter.querySelector(`#housing-type`);
const priceSelect = filter.querySelector(`#housing-price`);
const roomsSelect = filter.querySelector(`#housing-rooms`);
const guestsSelect = filter.querySelector(`#housing-guests`);
const featuresFieldset = filter.querySelector(`#housing-features`);
let data = [];
let filteredData = [];

const filtrationItem = (it, item, key) => {
  return it.value === `any` ? true : it.value === item[key].toString();
};

const filtrationByType = (item) => {
  return filtrationItem(typeSelect, item.offer, `type`);
};

const filtrationByPrice = (item) => {
  let filteringPrice = window.data.PRICE_RANGE[priceSelect.value.toUpperCase()];
  return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
};

const filtrationByRooms = (item) => {
  return filtrationItem(roomsSelect, item.offer, `rooms`);
};

const filtrationByGuests = (item) => {
  return filtrationItem(guestsSelect, item.offer, `guests`);
};

const filtrationByFeatures = function (item) {
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
  window.map.renderPinsMarkup(filteredData.slice(0, window.data.PINS_LIMIT));
});

const activateFilter = () => {
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

const deactivateFilter = function () {
  filterItems.forEach((it) => {
    it.disabled = true;
  });
  resetFilter();
  filter.removeEventListener(`change`, onFilterChange);
};

const activateFiltration = (adData) => {
  data = adData.slice(0);
  activateFilter();
  return adData.slice(0, window.dataPINS_LIMIT);
};

const deactivateFiltration = () => {
  deactivateFilter();
};

window.filter = {
  activate: activateFiltration,
  deactivate: deactivateFiltration
};

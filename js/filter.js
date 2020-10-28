'use strict';

(function () {
  const filter = window.util.monipulateElementDOM('.map__filters');
  const filterItems = filter.querySelectorAll('select, input');
  const typeSelect = filter.querySelector('#housing-type');
  let data = [];
  let filteredData = [];

  const filtrationItem = (it, item, key) => {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  const filtrationByType = (item) => {
    return filtrationItem(typeSelect, item.offer, 'type');
  };

  const onFilterChange = () => {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filtrationByType);
    window.map.removePins();
    window.map.removeMapCard();
    window.map.renderPinsMarkup(filteredData.slice(0, window.data.PINS_LIMIT));
  };

  const activateFilter = () => {
    filterItems.forEach((it) => {
      it.disabled = false;
    });
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
  };

  const activateFiltration = (adData) => {
    data = adData.slice(0);
    activateFilter();
    return adData.slice(0, window.dataPINS_LIMIT);
  };

  window.filter = {
    activate: activateFiltration
  };

})();

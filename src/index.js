import { el, element, formatDate } from './lib/utils';
import { fetchEarthquakes } from './lib/earthquakes';
import { createPopup, init } from './lib/map'
//importa öðru sem þarf

document.addEventListener('DOMContentLoaded', async () => {
  init('bla');

  fetchEarthquakes().then((data) => {


    //hér fjarlægi ég loading divið.
    //og geri það sem þarf


    console.log(data);
  });
});

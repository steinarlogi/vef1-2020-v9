import { listElement, formatDate } from './lib/utils';
import { fetchEarthquakes } from './lib/earthquakes';
import { createPopup, init, addToMap } from './lib/map'
//importa öðru sem þarf

document.addEventListener('DOMContentLoaded', async () => {
  init('bla');

  fetchEarthquakes().then((data) => {


    //hér fjarlægi ég loading divið.
    //og geri það sem þarf
    //bý til lista element og bæti við ul

    let earthquakeData = data.features;

    for(let i = 0; i < earthquakeData.length; i++) {

      let popup = createPopup(
        earthquakeData[i],
        document.createElement('div').innerHtml = (
          '<p>' +
          earthquakeData[i].properties.place +
          '</p>' +
          '<p>' +
          formatDate(earthquakeData[i].properties.time) +
          '</p>' +
          '<p>' +
          earthquakeData[i].properties.mag + ' á richter' +
          '</p>')
        );

      let element = listElement(
        earthquakeData[i].properties.place,
        earthquakeData[i].properties.time,
        earthquakeData[i].properties.mag,
        earthquakeData[i].properties.url,
        popup
      );

      document.querySelector('.earthquakes').appendChild(element);
      addToMap(popup);
    }
  });
});

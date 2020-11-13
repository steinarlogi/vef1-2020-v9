import { listElement, formatDate } from './lib/utils';
import fetchEarthquakes from './lib/earthquakes';
import { createPopup, init, addToMap } from './lib/map';

document.addEventListener('DOMContentLoaded', async () => {
  init();

  fetchEarthquakes().then((data) => {
    const earthquakeData = data.features;

    document.querySelector('.loading').remove();
    for (let i = 0; i < earthquakeData.length; i += 1) {
      const popup = createPopup(
        earthquakeData[i],
        document.createElement('div').innerHtml = (
          `<p>
          ${earthquakeData[i].properties.place}
          </p>
          <p>
          ${formatDate(earthquakeData[i].properties.time)}
          </p>
          <p>
          ${earthquakeData[i].properties.mag} á richter
          </p>`),
      );

      const element = listElement(
        earthquakeData[i].properties.place,
        earthquakeData[i].properties.time,
        earthquakeData[i].properties.mag,
        earthquakeData[i].properties.url,
        popup,
      );

      document.querySelector('.earthquakes').appendChild(element);
      addToMap(popup);
    }
  });
});

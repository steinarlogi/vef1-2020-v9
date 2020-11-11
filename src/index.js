import { el, element, formatDate } from './lib/utils';
import { fetchEarthquakes } from './lib/earthquakes';
//importa öðru sem þarf

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOMContentLoaded')
  fetchEarthquakes();
});

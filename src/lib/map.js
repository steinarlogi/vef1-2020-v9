import L from 'leaflet';

let map;

// Býr til popup á korti út frá geojson með content
export function createPopup(obj, content) {
  return L.geoJSON(obj, {}).bindPopup(content);
}

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init() {
  map = L.map(document.querySelector('.map'), {
    center: [64.140436, -21.94937],
    zoom: 13,
  });

  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);
}

export function addToMap(popup) {
  popup.addTo(map);
}

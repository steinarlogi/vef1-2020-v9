import { format } from 'date-fns';

/**
 * Format a timestamp as dd.mm.yyyy hh:mm:ss e.g. "01.11.2020 12:00:00".
 *
 * @param {number} timestamp Unix timestamp to format
 * @returns {string} Formatted string.
 */
export function formatDate(timestamp) {
  return format(new Date(timestamp), 'dd:MM:y HH:mm:ss');
}

/**
 * Create an element with attributes and events, and append elements or
 * strings to it.
 *
 * Usage:
 *  const el = element(
 *    'button',
 *    { 'class': 'button' },
 *    { click: () => { ... } },
 *    'Takki'
 *   );
 *  returns
 *  <button class="button">Takki</button> with a click handler.
 *
 * @param {string} name Element name
 * @param {object} attributes Object containing attributes to attach to element.
 * @param {object} events Object of events to add to element.
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function element(name, attributes = null, events = null, ...children) {
  const obj = document.createElement(name);

  children.forEach((child) => {
    if (child) {
      if (typeof child === 'string') {
        obj.appendChild(document.createTextNode(child));
      } else {
        obj.appendChild(child);
      }
    }
  });

  if (attributes) {
    const tempKeys = Object.keys(attributes);
    tempKeys.forEach((key) => {
      obj.setAttribute(key, attributes[key]);
    });
  }

  if (events) {
    const tempKeys = Object.keys(events);
    tempKeys.forEach((key) => {
      obj.addEventListener(key, events[key]);
    });
  }

  return obj;
}

/**
 * Simplified element function.
 * Creates an element and append elements or strings to it.
 *
 * @param {string} name Element name
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function el(name, ...children) {
  return element(name, null, null, ...children);
}

/**
* @param {string} title Title of eartquake
* @param {int} time time of earthquake
* @param {double} strength strength of earthquake
* @param {string} url to information page about the earthquake
*/
export function listElement(title, time, strength, url, popup) {
  const dl = element(
    'dl',
    null,
    null,
    el('dt', 'Tími'),
    el('dd', formatDate(time)),
    el('dt', 'Styrkur'),
    el('dd', (`${strength} á richter`)),
  );

  const button = element(
    'div',
    { class: 'buttons' },
    null,
    element(
      'button',
      null,
      {
        click: () => {
          popup.openPopup();
        },
      },
      'Sjá á korti',
    ),
    element('a', { href: url, target: '_blank' }, null, 'Skoða nánar'),
  );

  const div = element(
    'div',
    null,
    null,
    el('h2', title),
    dl,
    button,
  );

  return element('li', null, null, div);
}

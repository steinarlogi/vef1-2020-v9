import { format } from "date-fns";

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
export function element(name, attributes = null, events = null,...children) {
  const el = document.createElement(name);

  for (const child of children) {
    if (!child) {
      continue;
    }

    if (attributes) {
      for (const attrib in attributes) {
        el.setAttribute(attrib, attributes[attrib]);
      }
    }

    if (events) {
      for (const event in events) {
        el.addEventListener(event, events[event]);
      }
    }

    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  }

  return el;
}

/**
* @param {string} title Title of eartquake
* @param {int} time time of earthquake
* @param {double} strength strength of earthquake
* @param {string} url to information page about the earthquake
*/
export function listElement(title, time, strength, url, popup) {
  let dl = element(
    'dl',
    null,
    null,
    el('dt', 'Tími'),
    el('dd', formatDate(time)),
    el('dt', 'Styrkur'),
    el('dd', (strength + ' á richter')),
  );

  let button = element(
    'div',
    {'class' : 'buttons'},
    null,
    element(
      'button',
      null,
      {'click': function() {
        popup.openPopup();}
      },
      'Sjá á korti'
    ),
    element('a', {'href': url, 'target': '_blank'}, null, 'Skoða nánar')
  );

  let div = element(
    'div',
    null,
    null,
    el('h2', title),
    dl,
    button,
  );


  return element('li', null, null, div);
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
 * Format a timestamp as dd.mm.yyyy hh:mm:ss e.g. "01.11.2020 12:00:00".
 *
 * @param {number} timestamp Unix timestamp to format
 * @returns {string} Formatted string.
 */
export function formatDate(timestamp) {
  return format(new Date(timestamp), 'dd:MM:y HH:mm:ss');
}

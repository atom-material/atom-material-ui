'use babel';
'use strict';

function toggleClass(boolean, className) {
    var root = document.querySelector('atom-workspace');

    if (boolean) {
        root.classList.add(className);
    } else {
        root.classList.remove(className);
    }
}

function toCamelCase(str) {
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

function randomItem(items) {
    var randomIndex = Math.floor(Math.random() * items.length)
    return items[randomIndex]
}

export default {
    toggleClass,
    toCamelCase,
    randomItem
};

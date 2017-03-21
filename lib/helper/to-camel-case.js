'use babel';

export default function toCamelCase(str) {
    return str
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\s(.)/g, $1 => $1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, $1 => $1.toLowerCase());
}

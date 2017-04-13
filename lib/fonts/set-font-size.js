'use babel';

export default function setFontSize(size) {
    const fontSize = size ? `${size}px` : null;
    document.documentElement.style.fontSize = fontSize;
}

'use babel';

atom.config.observe('atom-material-ui.fonts.fontSize', (size) => {
    document.documentElement.style.fontSize = `${size}px`;
});

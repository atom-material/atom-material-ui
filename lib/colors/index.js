'use babel';

import tinycolor from 'tinycolor2';
import writeConfigFile from '../helper/write-config-file';
import toggleClassName from '../helper/toggle-class-name';
import toCamelCase from '../helper/to-camel-case';
import colorTemplates from '../color-templates.json';

function buildColorSettings() {
    const accentColor = (typeof atom.config.get('atom-material-ui.colors.accentColor') === 'object') ?
        atom.config.get('atom-material-ui.colors.accentColor').toHexString() :
        atom.config.get('atom-material-ui.colors.accentColor');

    const baseColor = (typeof atom.config.get('atom-material-ui.colors.abaseColor') === 'object') ?
        atom.config.get('atom-material-ui.colors.abaseColor').toHexString() :
        atom.config.get('atom-material-ui.colors.abaseColor');

    const luminance = tinycolor(baseColor).getLuminance();
    let accentTextColor = '#666';

    if (luminance <= 0.3 && luminance > 0.22) {
        accentTextColor = 'rgba(255,255,255,0.9)';
    } else if (luminance <= 0.22) {
        accentTextColor = 'rgba(255,255,255,0.8)';
    } else if (luminance > 0.3) {
        accentTextColor = 'rgba(0,0,0,0.6)';
    }

    return `
        @accent-color: ${accentColor};
        @accent-text-color: ${accentTextColor};
        @base-color: ${baseColor};
    `;
}

atom.config.observe('atom-material-ui.colors.abaseColor', (color) => {
    const baseColor = (typeof color === 'object') ? tinycolor(color.toHexString()) : tinycolor(color);

    if (atom.config.get('atom-material-ui.colors.genAccent')) {
        const accentColor = baseColor.complement().saturate(20).lighten(5);
        return atom.config.set('atom-material-ui.colors.accentColor', accentColor.toRgbString());
    }

    return writeConfigFile(buildColorSettings());
});

atom.config.observe('atom-material-ui.colors.predefinedColor', (value) => {
    const newValue = toCamelCase(value);

    atom.config.set('atom-material-ui.colors.abaseColor', colorTemplates[newValue].base);
    atom.config.set('atom-material-ui.colors.accentColor', colorTemplates[newValue].accent);
});

atom.config.observe('atom-material-ui.colors.accentColor', () => writeConfigFile(buildColorSettings()));
atom.config.observe('atom-material-ui.colors.paintCursor', value => toggleClassName('amu-paint-cursor', value));

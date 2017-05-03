'use babel';

import tinycolor from 'tinycolor2';
import writeConfigFile from '../helper/write-config-file';
import toggleClassName from '../helper/toggle-class-name';
import toCamelCase from '../helper/to-camel-case';
import colorTemplates from '../color-templates.json';
import buildColorSettings from './build-color-settings';

atom.config.observe('atom-material-ui.colors.abaseColor', (color) => {
    const baseColor = (typeof color === 'object') ? tinycolor(color.toHexString()) : tinycolor(color);

    if (atom.config.get('atom-material-ui.colors.genAccent')) {
        const accentColor = baseColor.complement().saturate(20).lighten(5);
        return atom.config.set('atom-material-ui.colors.accentColor', accentColor.toRgbString());
    }

    return writeConfigFile(
        buildColorSettings(
            color, atom.config.get('atom-material-ui.colors.accentColor'),
        ),
        true,
    );
});

atom.config.onDidChange('atom-material-ui.colors.predefinedColor', (value) => {
    const newValue = toCamelCase(value.newValue);

    atom.config.set('atom-material-ui.colors.abaseColor', colorTemplates[newValue].base);
    atom.config.set('atom-material-ui.colors.accentColor', colorTemplates[newValue].accent);
});

atom.config.observe('atom-material-ui.colors.accentColor', color => (
    writeConfigFile(
        buildColorSettings(
            atom.config.get('atom-material-ui.colors.abaseColor'), color,
        ),
        true,
    )
));

atom.config.observe('atom-material-ui.colors.paintCursor', value => toggleClassName('amu-paint-cursor', value));

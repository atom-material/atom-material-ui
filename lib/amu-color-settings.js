'use babel';
'use strict';

import amu from './main';
import tinycolor from 'tinycolor2';
import colorTemplates from './color-templates';

function toCamelCase(str) {
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

function apply() {

    atom.config.onDidChange('atom-material-ui.colors.accentColor', () => amu.writeConfig());

    atom.config.onDidChange('atom-material-ui.colors.abaseColor', (value) => {
        var baseColor = tinycolor(value.newValue.toRGBAString());

        if (atom.config.get('atom-material-ui.colors.genAccent')) {
            let accentColor = baseColor.complement().saturate(20).lighten(5);
            return atom.config.set('atom-material-ui.colors.accentColor', accentColor.toRgbString());
        }

        amu.writeConfig();
    });

    atom.config.onDidChange('atom-material-ui.colors.predefinedColor', (value) => {
        var newValue = toCamelCase(value.newValue);

        atom.config.set('atom-material-ui.colors.abaseColor', colorTemplates[newValue].base);
        atom.config.set('atom-material-ui.colors.accentColor', colorTemplates[newValue].accent);
    });
}

export default {
    apply
};

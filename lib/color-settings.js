'use babel';
'use strict';

import amu from './main';
import { toCamelCase, toggleClass } from './helpers';
import tinycolor from 'tinycolor2';
import colorTemplates from './color-templates';

function init() {
    toggleClass(atom.config.get('learn-ide-material-ui.colors.paintCursor'), 'paint-cursor');
}

function apply() {

    init();
    
    atom.config.onDidChange('learn-ide-material-ui.colors.accentColor', () => amu.writeConfig());

    atom.config.onDidChange('learn-ide-material-ui.colors.abaseColor', (value) => {
        var baseColor = tinycolor(value.newValue.toRGBAString());

        if (atom.config.get('learn-ide-material-ui.colors.genAccent')) {
            let accentColor = baseColor.complement().saturate(20).lighten(5);
            return atom.config.set('learn-ide-material-ui.colors.accentColor', accentColor.toRgbString());
        }

        amu.writeConfig();
    });

    atom.config.onDidChange('learn-ide-material-ui.colors.predefinedColor', (value) => {
        var newValue = toCamelCase(value.newValue);

        atom.config.set('learn-ide-material-ui.colors.abaseColor', colorTemplates[newValue].base);
        atom.config.set('learn-ide-material-ui.colors.accentColor', colorTemplates[newValue].accent);
    });

    atom.config.onDidChange('learn-ide-material-ui.colors.paintCursor', (value) => toggleClass(value.newValue, 'paint-cursor'));
}

export default { apply };

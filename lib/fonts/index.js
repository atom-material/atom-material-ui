'use babel';

import setFontSize from './set-font-size';

atom.config.observe('atom-material-ui.fonts.fontSize', size => setFontSize(size));

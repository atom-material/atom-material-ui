'use babel';

import setFontSize from '../helper/set-font-size';

atom.config.observe('atom-material-ui.fonts.fontSize', size => setFontSize(size));

'use babel';
'use strict';

describe('AMU color options', () => {
    beforeEach(() => {
        this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(this.workspace);

        waitsForPromise('Theme Activation', () => {
            return atom.packages.activatePackage('atom-material-ui');
        });
    });

    it('should be able to change UI base color', () => {
        atom.config.set('atom-material-ui.colors.abaseColor', '#3F51B5');
        expect(atom.config.get('atom-material-ui.colors.abaseColor').toHexString().toUpperCase()).toBe('#3F51B5');

        atom.config.set('atom-material-ui.colors.abaseColor', '#673AB7');
        expect(atom.config.get('atom-material-ui.colors.abaseColor').toHexString().toUpperCase()).toBe('#673AB7');
    });

    it('should be able to change UI accent color', () => {
        atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
        expect(atom.config.get('atom-material-ui.colors.accentColor').toHexString().toUpperCase()).toBe('#FFFFFF');

        atom.config.set('atom-material-ui.colors.accentColor', '#B0E457');
        expect(atom.config.get('atom-material-ui.colors.accentColor').toHexString().toUpperCase()).toBe('#B0E457');
    });
});

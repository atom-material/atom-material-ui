'use babel';
'use strict';

describe('AMU ui options', () => {
    beforeEach(() => {
        this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(this.workspace);

        waitsForPromise('Theme Activation', () => {
            return atom.packages.activatePackage('atom-material-ui');
        });
    });

    it('should be able to cast shadows', () => {
        atom.config.set('atom-material-ui.ui.panelShadows', false);
        expect(this.workspace.classList.contains('panel-shadows')).toBe(false);

        atom.config.set('atom-material-ui.ui.panelShadows', true);
        expect(this.workspace.classList.contains('panel-shadows')).toBe(true);
    });

    it('should be able to add contrast to panels', () => {
        atom.config.set('atom-material-ui.ui.panelContrast', false);
        expect(this.workspace.classList.contains('panel-contrast')).toBe(false);

        atom.config.set('atom-material-ui.ui.panelContrast', true);
        expect(this.workspace.classList.contains('panel-contrast')).toBe(true);
    });

    it('should be able to toggle animations', () => {
        atom.config.set('atom-material-ui.ui.animations', false);
        expect(this.workspace.classList.contains('use-animations')).toBe(false);

        atom.config.set('atom-material-ui.ui.animations', true);
        expect(this.workspace.classList.contains('use-animations')).toBe(true);
    });
});

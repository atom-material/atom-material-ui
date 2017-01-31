'use babel';
'use strict';

describe('AMU Font Options', () => {
    beforeEach(() => {
        this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(this.workspace);

        waitsForPromise('Theme Activation', () => {
            return atom.packages.activatePackage('learn-ide-material-ui');
        });
    });

    it('should be able to scale UI via font-size', () => {
        atom.config.set('learn-ide-material-ui.fonts.fontSize', '18');
        expect(document.querySelector(':root').style.fontSize).toBe('18px');

        atom.config.set('learn-ide-material-ui.fonts.fontSize', '16');
        expect(document.querySelector(':root').style.fontSize).toBe('16px');
    });
});

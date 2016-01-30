'use babel';

describe('Atom Material UI', () => {
    it('should be able to scale UI via font-size', () => {
        atom.config.set('atom-material-ui.fonts.fontSize', '18')
        expect(atom.config.get('atom-material-ui.fonts.fontSize')).toBe('18');

        atom.config.set('atom-material-ui.fonts.fontSize', '16')
        expect(atom.config.get('atom-material-ui.fonts.fontSize')).toBe('16');
    });

    it('should be able to change UI base color', () => {
        atom.config.set('atom-material-ui.colors.abaseColor', '#3F51B5');
        expect(atom.config.get('atom-material-ui.colors.abaseColor')).toBe('#3F51B5');

        atom.config.set('atom-material-ui.colors.abaseColor', '#673AB7');
        expect(atom.config.get('atom-material-ui.colors.abaseColor')).toBe('#673AB7');
    });

    it('should be able to change UI accent color', () => {
        atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
        expect(atom.config.get('atom-material-ui.colors.accentColor')).toBe('#FFFFFF');

        atom.config.set('atom-material-ui.colors.accentColor', '#B0E457');
        expect(atom.config.get('atom-material-ui.colors.accentColor')).toBe('#B0E457');
    });
});

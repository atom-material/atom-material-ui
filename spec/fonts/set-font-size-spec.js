'use babel';

import setFontSize from '../../lib/fonts/set-font-size';

describe('Font size setter', () => {
    const root = document.documentElement;

    it('should be able to change root element\'s font-size', () => {
        expect(root.style.fontSize).toBe('');
        setFontSize(22);
        expect(root.style.fontSize).toBe('22px');
    });

    it('should be able to unset root element\'s font-size', () => {
        setFontSize(22);
        expect(root.style.fontSize).toBe('22px');
        setFontSize(null);
        expect(root.style.fontSize).toBe('');
    });
});

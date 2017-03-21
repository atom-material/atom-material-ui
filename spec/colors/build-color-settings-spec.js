'use babel';

import buildColorSettings from '../../lib/colors/build-color-settings';

describe('Settings string', () => {
    it('should return default values when no arguments are given', () => {
        const defaultSettings = buildColorSettings();

        expect(typeof defaultSettings).toBe('string');
        expect(!!defaultSettings).not.toBe(false);

        expect(defaultSettings.indexOf('@base-color: #009688'))
            .toBeGreaterThan(-1);

        expect(defaultSettings.indexOf('@accent-color: #FFFFFF'))
            .toBeGreaterThan(-1);

        expect(defaultSettings.indexOf('@accent-text-color: rgba(255,255,255,0.9)'))
            .toBeGreaterThan(-1);
    });

    it('should return the selected @base-color', () => {
        expect(buildColorSettings('#FF0000').indexOf('@base-color: #FF0000'))
            .toBeGreaterThan(-1);
    });

    it('should return the selected @base-color and @accent-color', () => {
        const customSettings = buildColorSettings('#FF0000', '#FAFAFA');

        expect(customSettings.indexOf('@base-color: #FF0000'))
            .toBeGreaterThan(-1);

        expect(customSettings.indexOf('@accent-color: #FAFAFA'))
            .toBeGreaterThan(-1);
    });
});

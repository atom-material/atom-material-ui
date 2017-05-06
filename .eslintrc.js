module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    extends: 'airbnb',
    env: {
        browser: true,
        jasmine: true,
    },
    globals: {
        atom: false,
        Color: false,
        waitsForPromise: false,
    },
    rules: {
        indent: ['error', 4],
    },
};

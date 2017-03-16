module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb',
    env: {
        browser: true,
    },
    globals: {
        atom: false,
        Color: false,
    },
    rules: {
        indent: [2, 4]
    },
};

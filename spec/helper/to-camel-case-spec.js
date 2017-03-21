'use babel';

import toCamelCase from '../../lib/helper/to-camel-case';

describe('camelCaseHelper', () => {
    it('should convert spaces to camelCase', () => {
        expect(toCamelCase('hello world')).toEqual('helloWorld');
    });

    it('should convert lisp-case to camelCase', () => {
        expect(toCamelCase('hello-world')).toEqual('helloWorld');
    });

    it('should convert snake_case to camelCase', () => {
        expect(toCamelCase('hello_world')).toEqual('helloWorld');
    });
});

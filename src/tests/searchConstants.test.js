const { tripApi } = require('../js/searchConstants.js');

describe('searchConstants.js', () => {
    test('search api to match', () => {    
        expect(tripApi).toBe('https://9og8ljgamd.execute-api.eu-west-1.amazonaws.com/Prod/Quote/Start/');
    })
})
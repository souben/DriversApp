const assert = require('assert');
const request = require('supertest');

const app  = require('../app');

describe('The express app',() => {
    it('handles a GET request to /api', (done) => {
        //supertest
        request(app)
            .get('/api')
            .end((err, response) => {
                assert(response.body.yes === 'welcome to the home page')
                done();
            })        
    })  
})
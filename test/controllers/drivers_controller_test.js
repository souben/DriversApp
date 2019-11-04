const assert = require('assert');
const request = require('supertest')
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('test for controllers', () => {

    it('test post drivers', (done) =>{

        Driver.countDocuments().then( count => {
            request(app)
                .post('/api/drivers')
                .send({name: 'smith', email:'abo@gmail.com'})
                .end( () => 
                        Driver.countDocuments().then( newCount => {
                             assert( count + 1 === newCount );
                                                       done()
                    })                   
                )
        }) 
    })
    it('test edit driver', (done) => {
        let props = { name:'alae', email:'abo@gmail.com'};
        let driver = new Driver(props);
        driver.save()
          .then( () => {
            request(app)
                .put(`/api/drivers/${driver.id}`)
                .send({ email: 'alae@test.co'})
                .end( () => 
                        Driver.findById(driver.id)
                            .then( (driver) => { assert(driver.email === 'alae@test.co')
                                                 done(); })
                )
           })
    }) 
    it('test delete driver', (done) => {
        let driver = new Driver({ name: 'smith',  email: 'ab@co.co'})
        driver.save()
             .then( () => {
                 request(app)
                      .delete(`/api/drivers/delete/${driver.id}`)
                      .end( () => { Driver.findById(driver.id)
                                    .then( FoundDriver => { assert(!FoundDriver)
                                                            done();
                                    })
                      })
             })
    })
    it('test find near users', (done) => {
        const rabatDriver = new Driver({
            email: 'rabat@test.com',
            location: { type: 'Point', coodinates: [-6.83255, 34.01325]}
        })
        const fesDriver = new Driver({
            email: 'fes@test.com',
            location: { type: 'Point', coordinates: [-4.9998, 34.03715]}
        })
        Promise.all([rabatDriver.save(), fesDriver.save()])
               .then(() => {
                   request(app)
                      .get('/api/drivers?lng=-4&lat=34')
                      .end( (err, response)=> {
                          assert( response.body.length === 1 );
                          assert(response.body[0].email !== 'fes@test.com');
                          done();
                      })
               })
    });
    
})
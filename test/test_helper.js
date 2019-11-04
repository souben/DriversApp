
// No need to put to see in we are n the test process
// because when we will be in it the test_helper (this file )
// will excuted 

// we have access to the keyword done if we're only in the test world  
const mongoose = require('mongoose');

before( (done) => {
    mongoose.connect('mongodb://localhost:27017/driverdb_test', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => console.warn('Error', error))
})

beforeEach((done) => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
           .then( () => drivers.createIndex({ 'location.coordinates': '2dsphere' }))
           .then( () => done())
           .catch(() => done()) // for the first time we connect to our database 
})                              // we will try to drop a collection that it didn't exist
                                // so we will throw an error

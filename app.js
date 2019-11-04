const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index') ;
const mongoose  = require('mongoose');

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost:27017/driverdb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } )
        .then( () => console.log('success connection to driverdb ...'))
        .catch( error => console.error(error))
}   
const app = express();
app.use(bodyParser.json());


app.use(routes);

app.use( (err, req, res, next) => {     // Now we will create our middleware
    res.status(422).send({ 'error' : err.message }) // so we will use : app.user() to handle our middleware

})


module.exports = app; 


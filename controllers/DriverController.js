const Driver = require('../models/driver');
module.exports = {
    homePage(req, res){
        res.send({ yes: 'welcome to the home page'});
    },
    create(req, res){
        const { name, email } = req.body;
        // if( !email || !name){
        //     res.send('you have to enter both fields');
        // }
        
        let driver = new Driver({ name: name, email: email})
        driver.save()
              .then( () => Driver.findOne({ email }))
              .then( newDriver =>  res.send(newDriver) )
              .catch( )
                
                        
    }
    ,
    update(req, res, next){
        let { id } = req.params ;
        let { name, email } = req.body;
        Driver.findByIdAndUpdate(id, {name: name, email: email})
              .then( () => Driver.findById({_id: id}) )
              .then( driver => res.send(driver))
              .catch(next)
    },
    delete(req, res, next){
        let id = req.params.id;
        Driver.findByIdAndRemove(id)
              .then( (driver) => res.send(204).send(driver ))
              .catch(next)
    },
    index(req, res, next){
        const rabatDriver = new Driver({
            email: 'rabat@test.com',
            location: { type: 'Point', coodinates: [-6.83255, 34.01325]}
        })
        rabatDriver.save();
        let lng, lat
        lng = parseFloat(req.query.lng);
        lat = parseFloat(req.query.lat);
        Driver.aggregate([{ $geoNear : 
                    { near : { type:'Point', coordinates: [lng, lat] },
                      spherical: true,
                      maxDistance: 250000,
                      distanceField: "dist.calculated"   // metres
                    }
                    }]) 
        
        .then( drivers => res.send(drivers))
        .catch( next );
    }

} 


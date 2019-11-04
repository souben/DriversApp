const DriverController = require('../controllers/DriverController');
const express = require('express');
const router  = express.Router();


router.get('/api/', DriverController.homePage ),
router.post('/api/drivers', DriverController.create) ;
router.put('/api/drivers/:id', DriverController.update);
router.delete('/api/drivers/delete/:id', DriverController.delete);
router.get('/api/drivers', DriverController.index);

module.exports = router;
  

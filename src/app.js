const Logger 	       = require('logger'),
      logger 	       = Logger.getLogger('ingester-sgdr.app'),
      properties 		 = require('properties')(process.env.NODE_ENV),
      ingesterController = require('./routes/ingesterController'),
      express		 = require('express');
      
let app = express();
app.use(`/${properties.service_path}`, ingesterController); 

module.exports = app;
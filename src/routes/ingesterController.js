const Logger   = require('logger'),
      logger   = rtveLogger.getLogger('ingester-sgdr.ingesterController'), 
      express  = require('express'),
      router   = express.Router(),
      service  = require('../services/ingesterService'),
      validate = require('../modules/validate'),
      config   = require('../modules/config');

const ingesterController = (req, res) => {

    logger.debug(`Controller ...`);

    if ( !req ){
        res.status(400).send('Bad Request');
    }

    // send data to Integration API
    service.sendData(req.body).then(response => {
        logger.info(`Controller service.sendData response =>  ${response} `);

        res.status(200).send(response);

    }).catch(error => {
        logger.error(`Controller service.sendData error =>  ${error} `);

        res.status(500).send('Internal Server Error');
    });

};

router.post('/', express.json(), validate.body,  ingesterController);

module.exports = router;
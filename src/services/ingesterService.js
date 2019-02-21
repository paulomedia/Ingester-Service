const Logger = require('logger'),
      logger = Logger.getLogger('ingester-sgdr.ingesterService'),  
      axios  = require('axios'),
      config = require('../modules/config');

/**
* @function sendDataToIntegrationService Make a request to API Integration sending data to process
* @param {string} method String represents the methos to use in request to API Integration
* @param {object||string} data represents the data to pass to API Integration
* @return {function} return the result of the axios request or void 0
*/
const sendDataToAPIIntegration = (method, data) => {

    logger.debug(`Service sendDataToIntegrationService data      => ${JSON.stringify(data)} `);
    logger.debug(`Service sendDataToIntegrationService method    => ${method} `);

    let url = config.getApiIntegrationUrl(method, data);

    logger.debug(`Service sendDataToIntegrationService url       => ${url}`);

    try {
        return axios({ method, url, data });
    } catch (error) {
        logger.error(`Service sendDataToIntegrationService error => ${error}`);
        return;
    }

};

module.exports = {
    /**
    * @function sendData Ingest the JSON format in API Integration Rules
    * @param {object} body Object to pass to API Integracion
    * @param {function} callback Callback, return function.
    */
    sendData(body) {
        logger.debug(`Service sendData body  => ${JSON.stringify(body)}`);

        // get the method to use in the requests to Integration API
        const method = config.getMethod(body);

        // get data depends of one of the existent methods
        const data = config.getData(method, body);

        // get transformed data to pass to Integration API
        const transformedData = config.getTransformedData(method, data);

        return sendDataToAPIIntegration(method, transformedData);
    }

};
/**
 * Modulo JS config
 * 
 * @module config
 */

const { methodMap, methodHttp } = require('../lib/constants'),
      properties                = require('properties')(process.env.NODE_ENV),
      Logger                    = require('logger'),
      logger                    = Logger.getLogger('ingester-sgdr.config');

/**
* @function getInterval Get the interval
* @param {object} data Object represents the body
* @return {number} return a number 
*/
const getInterval = data => {
    let result = null;
    const catchup = data.CACATCHUP | Number(data.CACATCHUP);
    const numDiasCatchup = data.CANUMDIASCATCHUP;

    if (catchup && numDiasCatchup & (catchup === 1 || catchup === 2)) {
        result = { interval: numDiasCatchup };
    }
    return result;
};

/**
* @function getWindows Get the windows in data
* @param {array} data Array of windows
* @return {array} return an array
*/
const getWindows = data => {
    return data.split(',') || data.split(', ') || data.split(' ,') || data.split(' , ');
};  

/**
* @function setYearToDate Set the year to a date
* @param {string} date String represents a date in format XX/YY/ZZ
* @return {string} return an string with format XX/YY/20ZZ
*/
const setYearToDate = date => {
    const year = '20';
    const lastTwo = date.substring(date.length-2, date.length);

    return date.substring(0, date.length-2) + year + lastTwo;
};

/**
* @function getWindowsList Get an array of formated dates
* @param {array} windows Array that represents the dates of windows
* @return {array} return a array transformed in correct format
*/
const getWindowsList = data => {
    let windowsData = getWindows(data);
    let arr = [];

    for ( let i = 0; i < windowsData.length; ++i ){
        for ( let j = 0; j < 1; ++j ){
            arr.push( setYearToDate(windowsData[i].split('-')[j]) + '-' + setYearToDate(windowsData[i].split('-')[j+1]) );
        }
    }
    return { 
        windows: arr 
    };
};

/**
* @function getCountriesList Get an array of countries to pass to Integration API
* @param {string} data String that represents the countries of the rules
* @return {array} return a array of countries
*/
const getCountriesList = data => {
    let countries = data.split(', ');

    if ( countries.length === 1 ){
        countries = data.split(',');
    }

    return countries;   
};

/**
* @function trasformData Data to transform
* @param {object} data Object represents the body
* @return {object} return a object transformed to send to API Integration.
*/
const transformData = data => {
    logger.debug(`Config transformData data => ${data}`);

    const interval = getInterval(data);

    const countries = getCountriesList(data.CAPAISES);

    const objTransformed = {
        'location_codes': {
            'location_codes_ok': countries
        },
        'init_date': data.CAFINIVIG,
        'internal': data.CAFKDERECHOINT
    };

    if ( data.CAFKSGC ){
        const sgceId = { sgceId: data.CAFKSGC };
        Object.assign(objTransformed, sgceId);
    }

    if ( data.CAVENTANAS ){
        const windows = getWindowsList(data.CAVENTANAS);
        Object.assign(objTransformed, windows);
    }

    if ( data.CAFKDERECHOCOMERC ){
        const commercial = { commercial: data.CAFKDERECHOCOMERC };
        Object.assign(objTransformed, commercial);
    }

    if ( interval ) {
        Object.assign(objTransformed, interval);
    } else {
        const finish_date = { finish_date: data.CAFFINVIG };
        Object.assign(objTransformed, finish_date);
    }

    return objTransformed;
};

module.exports = {

    /**
    * @function getMethod Get the method to use in API Integration requests
    * @param {object} data Object represents the body
    * @return {string} return the method to use in the requests to API Integracion
    */
    getMethod(data){
        return methodMap[data.CATIPOACCION];
    },

    /**
    * @function getData Get data to pass to Integration API
    * @param {string} method Method to use in Integration API requests
    * @param {object} data Object represents the body
    * @return {string||object} return a string or a object
    */
    getData(method, data){
        if ( method === methodHttp.DELETE ) {
            return data.CAFKSGC;
        }
        return data;
    },

    /**
    * @function getTransformedData Get the transformed data to pass to Integration API 
    * @param {string} method Method to use in Integration API requests
    * @param {object} data Object represents the body
    * @return {object||string} return a object with transformed data or a string represents a sgci_id
    */
    getTransformedData(method, data){
        if ( method === methodHttp.DELETE ){
            return data;
        }
        return transformData(data);
    },

    /**
    * @function getApiIntegrationUrl Get the url from API Integration
    * @param {string} method Method to use to change the data to pass in the request
    * @return {object||string} return a object with transformed data or a string represents a sgci_id
    */
    getApiIntegrationUrl(method, data){
        let url = properties.api_integration_protocol + '://' + properties.api_integration_host + ':' + properties.api_integration_port + '/' + properties.api_integration_path;
        return method === methodHttp.DELETE ? url + '/' + data : url;
    }

};
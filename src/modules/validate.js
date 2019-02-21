/**
 * Modulo JS validate
 * 
 * @module validate
 */

/**
* @function isValidAction Check if the action is correct
* @param {string} action String that represents the action
* @return {boolean} return a boolean value
*/
const isValidAction = action => {
    return /(A|M|D)/gi.test(action);
};

/**
* @function isValidSgce Check if the cod SGCE is correct
* @param {string} sgce String that represents the action
* @return {boolean} return a boolean value
*/
const isValidSgce = sgce => {
    return /^[a-zA-Z0-9]{15}$/.test(sgce);
};

/**
 * @function isCountry check if the country param are valid ( have 2 caracters )
 * @param {string} country country param
 * @return {boolean} return a boolean value
*/
const isCountry = country => {
    return country && /^[A-Z]{2,3}$/.test(country);
};

/**
* @function checkDate Check if the date is correct
* @param {string} sgce String that represents the action
* @return {boolean} return a boolean value
*/
const checkDate = date => {
    /* Example of date 12/12/2018 */

    // There are 10 caracters
    if (date.length !== 10){
        return false;
    } 

    const arr = date.split('/');

    // There are 3 parts
    if ( arr.length !== 3 ){
        return false;
    }

    // The first and second parts have 2 caracters
    if ( arr[0].length !== 2 && arr[1].length !== 2 ){
        return false;
    }

    // The last part have 4 elements
    if ( arr[2].length !== 4 ){
        return false;
    }

    return true;
};

/**
* @function isValidCountries Check if the countries in array of country is valid
* @param {string} countries String represents a country
* @return {boolean} return a boolean
*/
const isValidCountries = countries => {

    let arrCoutries = countries.split(', ');
    
    if ( arrCoutries.length === 1 ){
        arrCoutries = countries.split(',');
    }

    for ( let i = 0; i < arrCoutries.length; ++i ){
        if ( !isCountry(arrCoutries[i]) ){
            return false;
        }
    }
    return true;
};

/**
* @function isValidBody Check if the body is correct
* @param {object} body Object that represents the body from request
* @return {boolean} return a boolean value
*/
const isValidBody = body => {

    // check if is valid the accion
    if ( !isValidAction(body.CATIPOACCION) ){
        return false;
    }

    // check if is valid the SGCE
    if ( !isValidSgce(body.CAFKSGC) ){
        return false;
    }

    // check if is valid the initial and final date
    if ( !checkDate(body.CAFINIVIG) || !checkDate(body.CAFFINVIG) ){
        return false;
    }

    // check if the countries are valid
    if ( !isValidCountries(body.CAPAISES) ){
        return false;
    }

    return true;
};

module.exports = {
    /**
     * @function body check if the body params are valid
     * @param {object} req request object send by controller
     * @param {object} res response object send by controller
     * @return {function} if the validate are not ok we return a bad request
    */
    body(req, res, next){

        let validBody = isValidBody(req.body);

        return validBody ? next() : res.status(400).send('Bad request');
    }

};
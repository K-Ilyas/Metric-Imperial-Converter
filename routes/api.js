'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let error = 'invalid';
    let initNum, initUnit;
    try {
      initNum = convertHandler.getNum(input);
    }
    catch (err) {
      error += ' ' + err;
    }
    try {
      initUnit = convertHandler.getUnit(input);
    }
    catch (err) {
      error += (error === 'invalid number' ? ' and ' + err : ' ' + err);
    }
    if (error === 'invalid') {
      let [returnNum, returnUnit] = [convertHandler.convert(initNum, initUnit), convertHandler.getReturnUnit(initUnit)];
      res.status(200).json(convertHandler.getString(initNum, initUnit, returnNum, returnUnit));
    }
    else
      res.status(200).json(error);
  })


};

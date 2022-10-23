'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let error = '';
    let [initNum, initUnit] = [convertHandler.getNum(input), convertHandler.getUnit(input)];

    error = initNum == 'invalid number' && initUnit == 'invalid unit' ? 'invalid number and unit' : initNum == 'invalid number' ? 'invalid number' : initUnit == 'invalid unit' ? 'invalid unit' : '';

    if (error === '') {
      let [returnNum, returnUnit] = [convertHandler.convert(initNum, initUnit), convertHandler.getReturnUnit(initUnit)];
      res.json(convertHandler.getString(initNum, initUnit, returnNum, returnUnit));
    }
    else
      res.send(error);
  })

};

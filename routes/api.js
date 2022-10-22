'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res, next) => {
    req.error = 'invalid';
    try {
      req.initNum = convertHandler.getNum(req.query.input);
    }
    catch (err) {
      req.error += ' ' + err;
    }
    next();
  }, (req, res, next) => {
    try {
      req.initUnit = convertHandler.getUnit(req.query.input);
    }
    catch (err) {
      req.error += (req.error === 'invalid number' ? ' and ' + err : ' ' + err);
    }
    next();
  }, (req, res) => {
    if (req.error === 'invalid') {
      let [returnNum, returnUnit] = [convertHandler.convert(req.initNum, req.initUnit), convertHandler.getReturnUnit(req.initUnit)];
      res.status(200).json(convertHandler.getString(req.initNum, req.initUnit, returnNum, returnUnit));
    }
    else
      res.status(200).json(req.error);
  })


};

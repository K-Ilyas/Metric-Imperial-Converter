
function ConvertHandler() {

  this.getNum = function (input) {
    let newinput = input.replace(/^([A-Za-z]*)$/, '1$1');
    if ((newinput.match(/^([\d.]+)((\/)([\d.]+)){2,}(?=[A-Za-z]*)/)) !== null)
      throw 'number';
    return Number(eval(newinput.match(/^(\d+)((\.){0,1}(\d+)){0,1}((\/){0,1}(\d+)){0,1}(?=[A-Za-z]*)/)[0]).toFixed(5));
  };

  this.getUnit = function (input) {
    let result = input.match(/(?=([\d.\/])*)([A-Za-z]+)/);
    switch (result[0]) {
      case 'gal':
      case 'L':
      case 'mi':
      case 'km':
      case 'lbs':
      case 'kg':
        return result[0];
      default:
        throw 'unit';
        break;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        throw 'invalid input unit';
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'Kilometres';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:

        throw 'invalid input unit';
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        throw 'invalid input unit';
        break;
    }
    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = Object.assign({}, {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      'string': `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    });
    return result;
  };

}

module.exports = ConvertHandler;

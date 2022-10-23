const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('functional tests', function () {

        test('should correctly read a whole number input', function (done) {
            assert.equal(convertHandler.getNum('3mi'), 3, 'convertHandler.getNum(\'3mi\') should return the integer 3');
            done();
        });
        test('should correctly read a decimal number input', function (done) {
            assert.equal(convertHandler.getNum('3.5mi'), 3.5, 'convertHandler.getNum(\'3.5mi\') should return the decimal 3.5');
            done();
        });
        test('should correctly read a fractional input', function (done) {
            assert.equal(convertHandler.getNum('5/2mi'), 2.5, 'convertHandler.getNum(\'3.5mi\') should return the decimal');
            done();
        });
        test('should correctly read a fractional input with a decimal', function (done) {
            assert.equal(convertHandler.getNum('5.3/2.5mi'), 2.12, 'convertHandler.getNum(\'5.3/2.5mi\') should return the decimal 2.12');
            done();
        });
        test('should correctly return an error on a double-fraction (i.e. 3/2/3)', function (done) {
            assert.equal(convertHandler.getNum('5/2/2mi'), 'invalid number', ' convertHandler.getNum(\'5/2/2mi\') should return invalid number');
            done();
        });
        test('should correctly default to a numerical input of 1 when no numerical input is provided', function (done) {
            assert.equal(convertHandler.getNum('mi'), 1, 'convertHandler.getNum(\'mi\') should return the integer 1');
            done();
        });


        test('should correctly read each valid input unit', function (done) {
            assert.equal(convertHandler.getUnit('3kg'), 'kg', 'convertHandler.getUnit(\'3mi\') should return the unit mi');
            done();
        });
        test('should correctly return an error for an invalid input unit', function (done) {
            assert.equal(convertHandler.getUnit('3ght'), 'invalid unit', ' convertHandler.getUnit(\'3ght\') should return invalid unit');
            done();
        });
        test('should return the correct return unit for each valid input unit', function (done) {
            assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'convertHandler.getReturnUnit(\'kg\')should return the unit mi');
            done();
        });
        test('should correctly return the spelled-out string unit for each valid input unit', function (done) {
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'convertHandler.spellOutUnit(\'kg\') should return the string kilograms');
            done();
        });


        test('should correctly convert gal to L', function (done) {
            assert.equal(convertHandler.convert(12, 'gal'), 45.42492, 'cconvertHandler.convert(12,\'gal\') should return the number  45.42492');
            done();
        });
        test('should correctly convert L to gal', function (done) {
            assert.equal(convertHandler.convert(45.42492, 'L'), 12, 'cconvertHandler.convert(45.42492, \'L\') should return the number 12');
            done();
        });
        test('should correctly convert mi to km', function (done) {
            assert.equal(convertHandler.convert(3.1, 'mi'), 4.98895, 'convertHandler.convert(2, \'mi\') should return the number 3.21868');
            done();
        });
        test('should correctly convert km to mi', function (done) {
            assert.equal(convertHandler.convert(3.21868, 'km'), 2, 'convertHandler.convert(3.21868, \'km\') should return the number 2');
            done();
        });
        test('should correctly convert lbs to kg', function (done) {
            assert.equal(convertHandler.convert(5, 'lbs'), 2.26796, 'convertHandler.convert(5, \'lbs\') should return the number 2.26796');
            done();
        });
        test('should correctly convert kg to lbs', function (done) {
            assert.equal(convertHandler.convert(2.26796, 'kg'), 5, 'convertHandler.convert(2.26796, \'kg\') should return the number 5');
            done();
        });
    });
});
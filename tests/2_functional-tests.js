const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    suite('/api/convert?input=[data] => {object}', function () {
        test('?input=10L', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=10L')
                .end(function (err, res) {
                    assert.equal(res.status, 200, 'status should be 200');
                    assert.equal(res.body.initNum, 10, 'init number must be 10');
                    assert.equal(res.body.initUnit, 'L', 'init unit must be L');
                    assert.equal(res.body.returnNum, 2.64172, 'return number must be 2.64172');
                    assert.equal(res.body.returnUnit, 'gal', 'return unit must be gal');
                    assert.equal(res.body.string, '10 liters converts to 2.64172 gallons', 'string must return the string 10 liters converts to 2.64172 gallons');
                    done();
                });
        });
        test('?input=10g', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=32g')
                .end(function (err, res) {
                    assert.equal(res.status, 200, 'status should be 200');
                    assert.equal(res.body, 'invalid unit', 'body must return invalid unit');
                    done();
                });
        });
        test('?input=3/7.2/4kg', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=3/7.2/4kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200, 'status should be 200');
                    assert.equal(res.body, 'invalid number', 'body must return invalid number');
                    done();
                });
        });
        test('?input=3/7.2/4kilomegagram', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end(function (err, res) {
                    assert.equal(res.status, 200, 'status should be 200');
                    assert.equal(res.body, 'invalid number and unit', 'body must return nvalid number and unit');
                    done();
                });
        });
        test('?input=kg', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200, 'status should be 200');
                    assert.equal(res.body.initNum, 1, 'init number must be 1');
                    assert.equal(res.body.initUnit, 'kg', 'init unit must be kg');
                    assert.equal(res.body.returnNum, 2.20462, 'return number must be 2.20462');
                    assert.equal(res.body.returnUnit, 'lbs', 'return unit must be lbs');
                    assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds', 'string must return the string 1 kilograms converts to 2.20462 pounds');
                    done();
                });
        });
    })

});

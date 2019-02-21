const sinon              = require('sinon'),
      ingesterController = require('../../routes/ingesterController');

describe('Routes', function () {

  describe('Ingester controller', function () {

    it("Spie ingester controller", function () {

        let req, res, spy, result;

        req = res = {};
        res.status = e => ({ json: e => e });

        spy = sinon.spy(res, "status");
        result = ingesterController(req, res);

        expect(result).toEqual(false);
        expect(spy.calledOnce).toEqual(true);
        expect(spy.callCount).toEqual(1);

    });

  });
});

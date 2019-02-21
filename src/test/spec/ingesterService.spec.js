const service          = require('../../services/ingesterService'),
      dataInMockInsert = require('../mocks/dataInInsert.json'),
      dataInMockUpdate = require('../mocks/dataInUpdate.json'),
      dataInMockDelete = require('../mocks/dataInDelete.json'),
      dataOutMock      = require('../mocks/dataOut.json'),
      config           = require('../../modules/config'),
      { methodHttp }   = require('../../lib/constants');

describe('Ingester service',  () =>{

  describe('POST/',  () => {

      let response = {}, transformedData;
    
      const data = config.getData(methodHttp.POST, dataInMockInsert);
      
      transformedData = config.getTransformedData(methodHttp.POST, data);

      beforeAll(done => {

          service.sendData(dataInMockInsert).then(res => {
              response.status = res.status;
              response.statusText = res.statusText;
              response.data = res.data;
              done();
          }).catch(error => {
              response.error = error;
              done();
          });

      });
      
      it("Trasformed data ", () => {
          expect(transformedData).toBe(dataOutMock);
      });

      it("Status 200", () => {
          expect(response.status).toBe(200);
      });

      it("statusText OK", () => {
          expect(response.statusText).toBe("OK");
      });

      it("Status error", () => {
          expect(response.error.code).toBe('ECONNREFUSED');
      });

  });

  
  describe("PUT/",  () => {
    
      let response = {}, transformedData;
    
      const data = config.getData(methodHttp.PUT, dataInMockUpdate);
      
      transformedData = config.getTransformedData(methodHttp.PUT, data);

      beforeAll(done => {
          service.sendData(dataInMockUpdate).then(res => {
              response.status = res.status;
              response.statusText = res.statusText;
              response.data = res.data;
              done();
          }).catch(error => {
              response.error = error;
              done();
          });

      });

      it("Trasformed data ", () => {
          expect(transformedData).toBe(dataOutMock);
      });
      
      it("Status 200", () => {
          expect(response.status).toBe(200);
      });

      it("statusText OK", () => {
          expect(response.statusText).toBe("OK");
      });

      it("Status error", () => {
          expect(response.error.code).toBe('ECONNREFUSED');
      });
      
  });

  describe("DELETE/",  () => {
    
      let response = {}, transformedData;

      const data = config.getData(methodHttp.DELETE, dataInMockDelete);
      
      transformedData = config.getTransformedData(methodHttp.DELETE, data);
      
      beforeAll(done => {
          
          service.sendData(dataInMockDelete).then(res => {
              response.status = res.status;
              response.statusText = res.statusText;
              response.data = res.data;
              done();
          }).catch(error => {
              response.error = error;
              done();
          });

      });

      it("Trasformed data ", () => {
          expect(transformedData).toBe(dataInMockDelete.CAFKSGC);
      });

      it("Status 200", () => {
          expect(response.status).toBe(200);
      });

      it("statusText OK", () => {
          expect(response.statusText).toBe("OK");
      });

      it("Status error", () => {
         expect(response.error.code).toBe('ECONNREFUSED');
      });
      
  });
    
});

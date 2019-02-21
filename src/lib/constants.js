const action = {
  ADD: 'A',
  MODIFY: 'M',
  DELETE: 'D',
};

const methodMap = {
  A: 'POST',
  M: 'PUT',
  D: 'DELETE'
};

const methodHttp = {
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const msg = {
  PARAM: 'Request param is null or Empty',
  BODY: 'Request body is null or empty',
  CATIPOACCION: 'CATIPOACCION does not exist or is wrong',
  CAFKSGC: 'CAFKSGC does not exist or is wrong',
  CAFINIVIG: 'CAFINIVIG does not exist or is wrong',
  CAFFINVIG: 'CAFFINVIG does not exist or is wrong',
  CAPAISES: 'CAPAISES does not exist or is wrong',
  CAVENTANAS: 'CAVENTANAS does not exist or is wrong'
};


module.exports = { action, methodMap, methodHttp, msg };

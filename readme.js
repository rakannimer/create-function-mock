/** 
Usage
const asyncFunctionToMock = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 500);
  }).then(() => "resolved");
};
const functionToMock = () => {
  console.log('I will not be called')
};
const mockedSyncFunction = createFunctionMock(functionToMock);
const mockedAsyncFunction = createFunctionMock(asyncFunctionToMock);

mockedFunction();
console.log(mockedFunction.mock);
*/

const createFunctionMock = (mockImplementation = () => {}) => {
  const mock = {
    calls: []
  };
  const mockedFunction = (...params) => {
    const mockReturn = mockImplementation(...params);
    mock.calls.push({ params });
    return mockReturn;
  };
  mockedFunction.mock = mock;
  return mockedFunction;
};

module.exports = {
  createFunctionMock
};

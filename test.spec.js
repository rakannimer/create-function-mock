// import test from "ava";
import { createFunctionMock } from "./";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("create-function-mock", () => {
  test("can create sync mock", () => {
    console.log = createFunctionMock();
    const mockImplementation = () => {
      console.log("MOCK_LOG");
      return "MOCK_RETURN";
    };
    const mockedFunction = createFunctionMock(mockImplementation);
    const mockReturn = mockedFunction();
    const consoleLogCalls = console.log.getCalls();

    expect(mockReturn).toBe("MOCK_RETURN");
    expect(consoleLogCalls.length).toBe(1);
    expect(consoleLogCalls[0].params[0]).toBe("MOCK_LOG");
  });
  test("can create async mock", async () => {
    const asyncMockImplementation = async ms => {
      await delay(ms);
      return "ASYNC_MOCK_RETURN";
    };
    const mockedAsyncFunction = createFunctionMock(asyncMockImplementation);
    const mockCalls = mockedAsyncFunction.getCalls();
    const mockReturn = await mockedAsyncFunction(500);
    expect(mockReturn).toBe("ASYNC_MOCK_RETURN");
    expect(mockedAsyncFunction.getCalls());
    expect(mockCalls.length).toBe(1);
    expect(mockCalls[0].params[0]).toBe(500);
  });
});

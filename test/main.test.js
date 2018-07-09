let mockMakePayment = jest.fn();
let mockRefundPayment = jest.fn();
let mockGenerateQueue = jest.fn();

jest.doMock("../src/paymentService.js", () => {
  return {
    makePayment: mockMakePayment,
    refundPayment: mockRefundPayment
  };
});

jest.doMock("../src/queueService.js", () => {
  return mockGenerateQueue;
});

const processPayments = require("../src/main");

beforeEach(() => {
  mockMakePayment.mockReset();
  mockRefundPayment.mockReset();
  mockGenerateQueue.mockReset();
})

  test("does not call makePayment or refundPayment when paymentQueue is empty", () => {
    mockGenerateQueue.mockImplementationOnce(() => []);

    processPayments();

    expect(mockMakePayment).toHaveBeenCalledTimes(0);
    expect(mockRefundPayment).toHaveBeenCalledTimes(0);
  });

  test("calls makePayment when next item in paymentQueue is positive", () => {
    mockGenerateQueue.mockReturnValue([1]);

    processPayments();

    expect(mockMakePayment).toHaveBeenCalledTimes(1);
    expect(mockRefundPayment).toHaveBeenCalledTimes(0);
  });

  test("calls refundPayment when next item in paymentQueue is negative", () => {
    mockGenerateQueue.mockReturnValue([-1]);

    processPayments();

    expect(mockMakePayment).toHaveBeenCalledTimes(0);
    expect(mockRefundPayment).toHaveBeenCalledTimes(1);
  });

  test("should be able to accurately call either make or refund function", () => {
    mockGenerateQueue.mockImplementationOnce(() => [29, 31, 9, 0, -16]);

    processPayments();

    expect(mockMakePayment).toHaveBeenCalledTimes(4);
    expect(mockRefundPayment).toHaveBeenCalledTimes(1);
  });
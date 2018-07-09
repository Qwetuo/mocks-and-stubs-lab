const paymentService = require("../src/paymentService");

describe("makePayment", () => {
  test("makePayment returns string `payment made for $${amount}`", () => {
    let input1 = 29;
    expect(paymentService.makePayment(input1)).toBe(
      `payment made for $${input1}`
    );
  });
});

describe("refundPayment", () => {
  test("refundPayment returns string `refund made for $${amount}`", () => {
    let input1 = -16;
    expect(paymentService.refundPayment(input1)).toBe(
      `refund made for $${input1}`
    );
  });
});

mockRandomInt = jest
  .fn()
  .mockImplementationOnce(() => 3)
  .mockImplementationOnce(() => 2)
  .mockImplementationOnce(() => -19)
  .mockImplementationOnce(() => 49);

jest.doMock("mathjs", () => {
  return {
    randomInt: mockRandomInt
  };
});

const generateQueue = require("../src/queueService");

test.only("generateQueue should generate an array of random integers between -20 and 50", () => {
  let result = generateQueue();

  expect(Array.isArray(result)).toBe(true);
  expect(result).toEqual([2, -19, 49]);
});

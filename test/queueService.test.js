mockRandomInt = jest
  .fn()
  .mockReturnValueOnce(3) // first used to create an array with this length
  .mockReturnValueOnce(2) // and then used to input figures into the array
  .mockReturnValueOnce(-19)
  .mockReturnValueOnce(49);

jest.doMock("mathjs", () => {
  return {
    randomInt: mockRandomInt
  };
});

const generateQueue = require("../src/queueService");

test("generateQueue should generate an array of random integers between -20 and 50", () => {
  let result = generateQueue();

  expect(Array.isArray(result)).toBe(true);
  expect(result).toEqual([2, -19, 49]);
});

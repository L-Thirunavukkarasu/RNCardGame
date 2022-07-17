//generate random 6 numbers between 1-100
export const getRandomNumbers = () => {
  const randomNumbers = new Set();
  while (randomNumbers.size !== 6) {
    let random = Math.random();
    let obj = {
      value: Math.floor(random * 100) + 1,
      matched: false,
    };
    randomNumbers.add(obj);
  }
  return randomNumbers;
};

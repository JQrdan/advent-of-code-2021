const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = inputFile.split(',').map(num => parseInt(num));

const compressFish = (fish) => 
  fish.reduce((compressed, fishAge) => {
    if (!compressed[fishAge]) {
      compressed[fishAge] = 1;
    } else {
      compressed[fishAge]++;
    }
    return compressed;
  }, {});

const countFish = (compressedFish) => 
  Object.values(compressedFish).reduce((sum, count) => {
    sum+=count;
    return sum;
  }, 0);

const tick = (compressedFish) => {
  let newFish = 0;
  Object.entries(compressedFish).forEach(([age, count]) => {
    if(age == 0) {
      newFish = count;
    } else {
      compressedFish[age - 1] = count;
      compressedFish[age] = 0;
    }
  });

  compressedFish[8] = newFish;
  compressedFish[6] = compressedFish[6] ? compressedFish[6] + newFish : newFish;

  return compressedFish;
}

const run = (input, days) => {
  let compressedFish = compressFish(input);
  for (let i = 1; i <= days; i++) {
    compressedFish = tick(compressedFish);
  }
  console.log(`After ${days} days:`, countFish(compressedFish));
}

run(input, 80);
run(input, 256);
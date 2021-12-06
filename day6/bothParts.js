const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = inputFile.split(',').map(num => parseInt(num));

const sum = (array) => 
  Object.values(array).reduce((sum, count) => {
    sum+=count;
    return sum;
  }, 0);

const run = (input, days) => {
  const fish = new Array(9).fill(0);
  input.forEach(num => {fish[num] += 1});

  for (let i = 1; i <= days; i++) {
    newFish = fish.shift();
    fish.push(newFish);
    fish[6] += newFish
  }

  console.log(`After ${days} days:`, sum(fish));
}

run(input, 80);
run(input, 256);
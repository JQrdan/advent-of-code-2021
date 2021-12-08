const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const crabPositions = inputFile.split(',').map(num => parseInt(num));

const costs = crabPositions.map(position => {
  let targetPosition = position;

  return crabPositions.map(position => {
    return Math.abs(position - targetPosition);
  }).reduce((sum, fuelCost) => {
    sum+=fuelCost;
    return sum;
  }, 0);
});

console.log(Math.min(...costs));
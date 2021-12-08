const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const crabPositions = inputFile.split(',').map(num => parseInt(num));

const maxPosition = Math.max(...crabPositions);
const allPositions = [...Array(maxPosition).keys()];

const costs = allPositions.map(targetPosition => {
  return crabPositions.map(position => {
    const distance =  Math.abs(position - targetPosition);
    const cost = (distance * (distance + 1)) / 2;
    // console.log(targetPosition, position, distance, cost);
    return cost;
  }).reduce((sum, fuelCost) => {
    sum+=fuelCost;
    return sum;
  }, 0);
});

console.log(costs);
console.log(Math.min(...costs));
const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = inputFile.split('\n').map(entry => {
                return entry.split(' ')
              }).map(([direction, amount]) => {
                return [direction, parseInt(amount)];
              });

let position = {
  depth: 0,
  horizontal: 0,
  aim: 0
};

input.forEach(([direction, amount]) => {
  switch(direction) {
    case 'up':
      position.aim -= amount;
      break;
    case 'down':
      position.aim += amount;
      break;
    case 'forward':
      position.horizontal += amount
      position.depth += amount * position.aim
  }
});

console.log(position);
console.log(position.depth * position.horizontal);
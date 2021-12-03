const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = inputFile.split('\n').map(num => Array.from(num));

const sums = new Array(input[0].length).fill(0);

input.forEach((value) => {
  value.forEach((bit, index) => {
    sums[index] += parseInt(bit);
  })
});

let [gamma, epsilon] = ['', ''];
console.log(sums);
sums.forEach(sum => {
  console.log(input, input.length, sum);
  if (sum > input.length / 2) {
    gamma += 1
    epsilon += 0
  } else {
    gamma += 0
    epsilon += 1
  }
});

const gammaDec = parseInt(gamma, 2);
const epsilonDec = parseInt(epsilon, 2);

console.log(gamma, epsilon);
console.log(gammaDec, epsilonDec);
console.log(gammaDec * epsilonDec);

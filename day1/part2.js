const input = require('./parsedInput.js');

let outputString = ""
let largerMeasurements = 0;

let a = input[0];
let b = input[1];
let c = input[2];

let prevSum = a + b + c;
input.slice(3).forEach(current => {
  a = b;
  b = c;
  c = current;
  let curSum = a + b + c;

  if(curSum === prevSum) {
    outputString += `${curSum} No change\n`
  } else if (curSum < prevSum) {
    outputString += `${curSum} Decreased\n`
  } else if (curSum > prevSum) {
    outputString += `${curSum} Increased\n`
    largerMeasurements++
  }

  prevSum = curSum;
});

console.log(outputString);
console.log(largerMeasurements);

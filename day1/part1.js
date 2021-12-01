const input = require('./parsedInput.js');

let outputString = ""
let largerMeasurements = 0;

let previous = input[0];
input.forEach(current => {
  if(current === previous) {
    outputString += `${current} No change\n`
  } else if (current < previous) {
    outputString += `${current} Decreased\n`
  } else if (current > previous) {
    outputString += `${current} Increased\n`
    largerMeasurements++
  }
  previous = current;
});

console.log(outputString);
console.log(largerMeasurements);

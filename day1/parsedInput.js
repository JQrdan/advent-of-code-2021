const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = inputFile.split('\n').map(num => parseInt(num));

module.exports = input;
const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const rows = inputFile.split('\n').map(num => Array.from(num));

const countPositiveBitsAtPosition = (rows, index) => {
  let positiveBits = 0;
  rows.forEach((value) => {
    positiveBits += parseInt(value[index]);
  });
  return positiveBits;
}

const getMostCommonBitAtPosition = (rows, index) => {
  positiveBits = countPositiveBitsAtPosition(rows, index);
  return (positiveBits >= rows.length / 2) ? '1' : '0';
};

const getLeastCommonBitAtPosition = (rows, index) => {
  positiveBits = countPositiveBitsAtPosition(rows, index);
  return (positiveBits >= rows.length / 2) ? '0' : '1';
};

const filterEntriesWithBitAtPosition = (rows, bit, index) => {
  return rows.filter(row => row[index] === bit);
};

const getOxygenGenRating = (rows, position = 0) => {
  if(rows.length > 1) {
    const commonBit = getMostCommonBitAtPosition(rows, position);
    rows = filterEntriesWithBitAtPosition(rows, commonBit, position);
    return getOxygenGenRating(rows, ++position);
  } else {
    return rows[0].join('');
  }
}

const getCo2ScrubRating = (rows, position = 0) => {
  if(rows.length > 1) {
    const commonBit = getLeastCommonBitAtPosition(rows, position);
    rows = filterEntriesWithBitAtPosition(rows, commonBit, position);
    return getCo2ScrubRating(rows, ++position);
  } else {
    return rows[0].join('');
  }
}

const oxygenGenRating = getOxygenGenRating(rows);
const co2ScrubRating = getCo2ScrubRating(rows);

const oxygenGenRatingDec = parseInt(oxygenGenRating, 2);
const co2ScrubRatingDec = parseInt(co2ScrubRating, 2);

console.log(oxygenGenRating, oxygenGenRatingDec);
console.log(co2ScrubRating, co2ScrubRatingDec);

console.log(oxygenGenRatingDec * co2ScrubRatingDec);

const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const lines = inputFile.split('\n').map(line => line.split(' -> ')).map((coord) => {
  const [c1, c2] = coord;
  return [
    {
      x: parseInt(c1.split(',')[0]),
      y: parseInt(c1.split(',')[1]),
    },
    {
      x: parseInt(c2.split(',')[0]),
      y: parseInt(c2.split(',')[1]),
    }
  ]
});

const getBoundaries = (lines => {
  return lines.reduce(({x,y}, line) => {
    for(const coord of line) {
      if (coord.x > x) {
        x = coord.x;
      }
      if (coord.y > y) {
        y = coord.y;
      }
    }

    return {x, y};
  }, {x: 0, y: 0});
});

const createMap = (x, y) =>  Array(y + 1).fill([]).map(() => {
  return Array(x + 1).fill('.')
});

const drawMap = (map) => {
  return map.map(row => {
    return row.join('');
  }).join('\n');
};

const isStraightLine = (p1, p2) => p1.x === p2.x || p1.y === p2.y;

const fillDiagonalLine = (line) => {
  const x1 = line[0].x;
  const y1 = line[0].y;
  const x2 = line[1].x;
  const y2 = line[1].y;

  let xs = [];
  let ys = [];


  // zip
  return xs.map(function(e, i) {
    return [e, ys[i]];
  });
}

const fillStraightLine = (line) => {
  const x1 = line[0].x;
  const y1 = line[0].y;
  const x2 = line[1].x;
  const y2 = line[1].y;

  const newLine = [];

  let start, end;
  if(x1 === x2) {
    start = y1;
    end = y2;

    if(start < end) {
      // increase
      for(let i = start; i <= end; i++) {
        newLine.push([x1, i]);
      }
    } else {
      // decrease
      for(let i = start; i >= end; i--) {
        newLine.push([x1, i]);
      }
    }
  } else if(y1 === y2) {
    start = x1;
    end = x2;

    if(start < end) {
      // increase
      for(let i = start; i <= end; i++) {
        newLine.push([i, y1]);
      }
    } else {
      // decrease
      for(let i = start; i >= end; i--) {
        newLine.push([i, y1]);
      }
    }
  }

  return newLine;
};

const addLineToMap = ((map, line) => {
  line.forEach(([x, y]) => {
    if(map[y][x] === '.') {
      map[y][x] = 1;
    } else {
      map[y][x]++;
    }
  });

  return map;
});

const {x, y} = getBoundaries(lines);
let map = createMap(x, y);

lines.forEach(line => {
  if(isStraightLine(line[0], line[1])) {
    const fullLine = fillStraightLine(line);
    map = addLineToMap(map, fullLine);
  }
});

let overlaps = 0;
map.forEach(row => {
  row.forEach(cell => {
    if (cell > 1) {
      overlaps++;
    }
  })
});

console.log(`Overlaps: ${overlaps}`);
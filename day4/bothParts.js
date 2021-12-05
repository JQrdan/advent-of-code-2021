const fs = require('fs');
const path = require('path');

const inputFile = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const input = inputFile.split('\n');

const drawNumbers = input.shift().split(',').map(num => parseInt(num));

input.shift(); // drop first empty line

const getBoardSize = (board) => {
  return [board.length, board[0].length];
}

const createPlayerBoard = (playerBoards, playerMarkings, board) => {
  playerBoards.push(board);

  const tempMarkingsBoard = [];
  const [x, y] = getBoardSize(board);
  for(const _ in Array(x).fill(0)) {
    tempMarkingsBoard.push(Array(y).fill(false));
  }
  playerMarkings.push(tempMarkingsBoard);
}

const getPlayerBoards = () => {
  let playerBoards = [];
  let playerMarkings = [];
  let currentPlayer = [];
  
  while(input.length > 0) {
    const row = input.shift();
    if(row === '') {
      createPlayerBoard(playerBoards, playerMarkings, currentPlayer);
      currentPlayer = [];
    } else {
      currentPlayer.push(row.split(' ').filter(char => char !== ''));
    }
  }
  
  // the last board won't have a newline after it so check if there is a board in the temporary board
  if(currentPlayer.length > 0) {
    createPlayerBoard(playerBoards, playerMarkings, currentPlayer);
  }

  return [playerBoards, playerMarkings, playerBoards.length];
}

const markBoard = (board, markings, calledNumber) => {
  board.forEach((row, rowIndex) => {
    row.forEach((number, numberIndex) => {
      if (parseInt(number) === calledNumber) {
        markings[rowIndex][numberIndex] = true;
      }
    })
  });
}

const checkWinningRow = (markings) => {
  for(const row of markings) {
    const winnningRow = row.reduce((acc, result) => {
      return acc && result;
    }, true);

    if (winnningRow) {
      return true;
    }
  }

  return false;
};

const checkWinningColumn = (markings) => {
  const columns = markings[0].length;

  for(let i = 0; i < columns; i++) {
    let winningCol = true;

    for(const row of markings) {
      winningCol = winningCol && row[i];
    }

    if(winningCol) {
      return true;
    }
  }

  return false;
}

const checkWinner = (markings) => {
  return checkWinningRow(markings) || checkWinningColumn(markings);
}

const playBingo = () => {
  const winners = [];
  const winningIndexes = [];
  const [playerBoards, playerMarkings] = getPlayerBoards(input);

  while(drawNumbers.length > 0) {
    const calledNumber = drawNumbers.shift();

    for(let i = 0; i < playerBoards.length; i++) {
      // don't mark the board if the player has already won
      if(!winningIndexes.includes(i)) {
        markBoard(playerBoards[i], playerMarkings[i], calledNumber);

        if(checkWinner(playerMarkings[i])) {
          winningIndexes.push(i);
          winners.push([playerBoards[i], playerMarkings[i], calledNumber])
        }
      }
    }
  }

  return winners;
}

const calculateScore = (board, markings, winningNumber) => {
  let sum = 0;
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!markings[rowIndex][cellIndex]) {
        sum += parseInt(cell);
      }
    });
  });
  return sum * winningNumber;
}

const winners = playBingo();

const winningScore = calculateScore(...winners[0]);
console.log('First winner score:', winningScore);

const lastWinnerScore = calculateScore(...winners[winners.length - 1]);
console.log('Last winner score:', lastWinnerScore);

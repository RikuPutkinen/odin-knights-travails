function knightMoves(start, end) {
  const moveBoard = createMoveBoard();
  const nullBoard = createNullBoard();
  
  let current = start;
  const visited = [];
  const visitQueue = [];
  
  if (checkArrayEquality(start, end)) {
    console.log("You are already done");  
    return [start];
  }

  while (!checkArrayEquality(current, end) && visited.length < 65) {

    moveBoard[current[0]][current[1]].forEach(pos => {
      if (!includesArray(visited, pos) && !includesArray(visitQueue, pos)) visitQueue.push(pos);
      if (nullBoard[pos[0]][pos[1]] === null && !includesArray(visited, pos)) nullBoard[pos[0]][pos[1]] = current;
    });
    
    visited.push(current);
    current = visitQueue.shift();
  }

  const path = [];
  while (nullBoard[current[0]][current[1]] !== null) {
    path.unshift(current);
    current = nullBoard[current[0]][current[1]];
  }
  path.unshift(start);

  console.log(`=> You made it in ${path.length - 1} moves!  Here's your path:`);
  path.forEach(elem => console.log(`\t\[${elem[0]},${elem[1]}\]`));

  return path;
}

function createMoveBoard() {
  const board = [];

  for (let i = 0; i < 8; i++) {
    const row = [];
    
    for (let j = 0; j < 8; j++) {
      row.push([
        [i-2, j-1],
        [i-2, j+1],
        [i-1, j-2],
        [i-1, j+2],
        [i+1, j-2],
        [i+1, j+2],
        [i+2, j-1],
        [i+2, j+1],
      ].filter(elem => (0 <= elem[0] && elem[0] <= 7) && (0 <= elem[1] && elem[1] <= 7)))
    }
    board.push(row);
  }
  return board;
}

function createNullBoard() {
  const board = [];

  for (let i = 0; i < 8; i++) {
    const row = [];
    
    for (let j = 0; j < 8; j++) {
      row.push(null)
    }
    board.push(row);
  }
  return board;
}

function checkArrayEquality(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((elem, i) => elem === arr2[i]);
}

function includesArray(arr1, arr2) {
  return arr1.some(elem => checkArrayEquality(elem, arr2));
}

knightMoves([3,3],[4,3])
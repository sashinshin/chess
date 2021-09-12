import renderPieces from './renderPieces.js';
import fenParser from './fenParser.js';

// Variables
const newGameFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const startedGameFEN = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1';

// Initalize game objext
const game = fenParser(startedGameFEN);

// Reference board and pieces
const boardRef = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
];

const rankRef = ['8', '7', '6', '5', '4', '3', '2', '1'];
const fileRef = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const findIndex = (array, value) => array.findIndex(e => e === value); 

// Reset event listener
const deepClone = node => {
    const newNode = node.cloneNode(true);
    node.replaceWith(newNode);
}


// Add event listeners
const deselect = event => {

    let squareIndex = 0;
    const squares = [...document.querySelectorAll('.square')];

    game.boardState.forEach(rank => {

        for (let file = 0; file < rank.length; file++) {

            addPieceListener(squares[squareIndex], rank[file]);
            squareIndex++
        }
    });

    // Remove highlight
    const potentialSquare = [...document.querySelectorAll('.movable')];
    potentialSquare.forEach(square => square.classList.remove('movable'));
    event.target.classList.remove('selected');
    event.target.parentNode.removeEventListener('click', deselect);
};

// Bishop movement
const bishop = (rank, file) => {
    const availableSquares = [];


    let fileIncrement = 1;
    for (let i = rank + 1; i < 8; i++) {
        const targetSquare = boardRef[i][file - fileIncrement];
        if (game.unavailableSquares.includes(targetSquare) || !targetSquare) {
            break;
        }
        availableSquares.push(targetSquare);
        if (game.boardState[i][file - fileIncrement] !== null) {
            break;
        }
        fileIncrement++
    };

    fileIncrement = 1;
    for (let i = rank + 1; i < 8; i++) {
        const targetSquare = boardRef[i][file + fileIncrement];
        if (game.unavailableSquares.includes(targetSquare) || !targetSquare) {
            break;
        }
        availableSquares.push(targetSquare);
        if (game.boardState[i][file + fileIncrement] !== null) {
            break;
        }
        fileIncrement++
    }

    fileIncrement = 1;
    for (let i = rank - 1; i > -1; i--) {
        const targetSquare = boardRef[i][file - fileIncrement];
        if (game.unavailableSquares.includes(targetSquare) || !targetSquare) {
            break;
        }
        availableSquares.push(targetSquare);
        console.log(targetSquare);
        console.log(game.boardState[i][file - fileIncrement]);
        if (game.boardState[i][file - fileIncrement] !== null) {
            break;
        }
        fileIncrement++
    }

    fileIncrement = 1;
    for (let i = rank - 1; i > -1; i--) {
        const targetSquare = boardRef[i][file + fileIncrement];
        if (game.unavailableSquares.includes(targetSquare) || !targetSquare) {
            break;
        }
        availableSquares.push(targetSquare);
        if (game.boardState[i][file + fileIncrement] !== null) {
            break;
        }
        fileIncrement++
    }

    // fileIncrement = 1;
    // for (let i = rank - 1; i > -1; i--) {
    //     if (boardRef[i][file - fileIncrement]) {
    //         availableSquares.push(boardRef[i][file - fileIncrement]);
    //     }
    //     if (boardRef[i][file + fileIncrement]) {
    //         availableSquares.push(boardRef[i][file + fileIncrement]);
    //     }
    //     fileIncrement++
    // }

    return availableSquares;
};

const move = () => {
    console.log("move");
}


// Select event
const select = event => {
    // const squares = [...document.querySelectorAll('.square')];

    // Visuals
    event.target.classList.add('selected');
    event.target.parentNode.classList.remove('hover');

    // Get rank and file
    const algebraicNotation = event.target.parentNode ? event.target.parentNode.id : event.target.id;
    const file = findIndex(fileRef, algebraicNotation[0]);
    const rank = findIndex(rankRef, algebraicNotation[1]);
    console.log(game.boardState[rank][file]);

    // Clear event listeners
    const board = document.getElementById('board');
    deepClone(board);

    // Add move
    const moveSquares = bishop(rank, file, algebraicNotation);
    console.log(moveSquares);
    moveSquares.forEach(an => {
        const moveableSquare = document.getElementById(an);
        moveableSquare.addEventListener('click', move);
        moveableSquare.classList.add('movable')
    });

    // Add deselect
    const square = document.getElementById(algebraicNotation);
    square.addEventListener('click', deselect);

}

// Hover effect
const mouseover = event => event.target.classList.add('hover');
const mouseout = event => event.target.classList.remove('hover');


// Piece event listener
const addPieceListener = (square, piece) => {
 
    if (piece !== null && square.childNodes[1].id === game.activeColor) {

        square.addEventListener('click', select);
        square.addEventListener('mouseover', mouseover);
        square.addEventListener('mouseout', mouseout);

    }
}

// Render algebraic notation to squares
const renderAlgebraicNotation = (square) => {
    const id = document.createElement('span');

    id.textContent = square.id;
    square.appendChild(id);
}

const getUnavailableSquares = () => {
    const unavailableSquares = [];

    const checkTurn = (input) => {
        if (game.activeColor === 'w') {
            return input.toUpperCase() === input;
        }
        return input.toLowerCase() === input;
    }

    game.boardState.forEach((rank, index) => {
        for (let file = 0; file < rank.length; file++) {
            if (rank[file] !== null && checkTurn(rank[file])) {
                unavailableSquares.push(boardRef[index][file]);
            }
        }
    });

    return unavailableSquares;
}

// Initialize game
const init = () => {
    let squareIndex = 0;
    const squares = [...document.querySelectorAll('.square')];
    game.unavailableSquares = getUnavailableSquares();

    game.boardState.forEach(rank => {

        for (let file = 0; file < rank.length; file++) {

            renderAlgebraicNotation(squares[squareIndex]);
            renderPieces(squares[squareIndex], rank[file]);
            addPieceListener(squares[squareIndex], rank[file]);
            squareIndex++
        }
    });
}

init();

console.log(game);

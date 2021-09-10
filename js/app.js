import renderPieces from './renderPieces.js';
import fenParser from './fenParser.js';

// Variables
const newGameFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const startedGameFEN = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R';


const game = fenParser(newGameFEN);

const boardRef = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
]


// Add event listeners
const deselect = event => {
    console.log("in deselect");
    let squareIndex = 0;
    const squares = [...document.querySelectorAll('.square')];

    game.boardState.forEach(rank => {

        for (let file = 0; file < rank.length; file++) {

            addPieceListener(squares[squareIndex], rank[file]);
            squareIndex++
        }
    });

    console.log(event.target.parentNode);
    event.target.classList.remove('selected');
    event.target.parentNode.removeEventListener('click', deselect);
    console.log(event.target);

}

const select = event => {
    const squares = [...document.querySelectorAll('.square')];

    event.target.addEventListener('click', deselect)
    event.target.classList.add('selected');

    event.target.parentNode.classList.remove('hover');
    console.log(event.target.parentNode.rank);
    console.log(event.target.parentNode.file);
    console.log(event.target.parentNode.id);

    //console.log(boardRef[event.target.parentNode.rank][event.target.parentNode.file]);



    squares.forEach(square => {
        
        const newSquare = square.cloneNode(true);
        
        if (event.target === square.childNodes[1] ) {

            newSquare.addEventListener('click', deselect);
        }

        square.replaceWith(newSquare);
    });

    //console.log(event.target);
    //event.target.addEventListener('click', deselect);

}


const mouseover = event => event.target.classList.add('hover');
const mouseout = event => event.target.classList.remove('hover');

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

// Add coordinate reference
const coordRef = (square, rank, file) => {
    square.rank = rank;
    square.file = file;
}

// Initialize game
const init = () => {
    let squareIndex = 0;
    const squares = [...document.querySelectorAll('.square')];

    game.boardState.forEach((rank, index) => {

        for (let file = 0; file < rank.length; file++) {

            coordRef(squares[squareIndex], index, file);
            renderAlgebraicNotation(squares[squareIndex]);
            renderPieces(squares[squareIndex], rank[file]);
            addPieceListener(squares[squareIndex], rank[file]);
            squareIndex++
        }
    });
}

init();



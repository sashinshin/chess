import { renderPieces } from "./renderPieces";
import { FENparser } from "./fenParser";

// Variables
const squares = [...document.querySelectorAll('.square')];
const newGameFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const startedGameFEN = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R';


const boardState = FENparser(newGameFEN);
console.log(boardState);

// Add event listeners
const deselect = event => {
    // squares.forEach((square, index) => {
    //     addPieceListener(square, index);
    // });

    const allSquares = [...document.querySelectorAll('.square')];
    allSquares.forEach((square, index) => {
        addPieceListener(square, index);
    });


    console.log("in deselect");
    console.log(event.target);
    event.target.classList.remove('selected');
    event.target.removeEventListener('click', deselect);
    console.log(squares);

    event.target.addEventListener('click', select);
}

const select = event => {
    const allSquares = [...document.querySelectorAll('.square')];
    console.log("in select");



    mouseout(event);
    event.target.addEventListener('click', deselect)
    event.target.classList.add('selected');

    console.log(event.target);

    allSquares.forEach(square => {

        const newSquare = square.cloneNode(true);
        if (event.target === square.childNodes[1]) {
            newSquare.classList.remove('hover');
            newSquare.addEventListener('click', deselect);
        }
        //console.log(square.cloneNode(true));
        square.replaceWith(newSquare);
    });

}


const mouseover = event => event.target.classList.add('hover');
const mouseout = event => event.target.classList.remove('hover');

const addPieceListener = (square, index) => {
    if (boardState[index] !== null) {
        console.log("hello in addpiecelistener");
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

// Initialize game
const init = () => {
    squares.forEach((square, index) => {
        renderAlgebraicNotation(square);
        renderPieces(square, index);
        addPieceListener(square, index);
    });
}

init();

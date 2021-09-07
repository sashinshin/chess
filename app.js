// Variables
const squares = [...document.querySelectorAll('.square')];
const newGameFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const startGameFEN = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R';

// Parses Forsyth–Edwards Notation
const FENparser = (FEN) => {
    const regexGeneral = /([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)/gi;
    const fenSplit = regexGeneral.exec(FEN);
    const board = []

    for (let i = 1; i < 9; i++) {
        for (let j = 0; j < fenSplit[i].length; j++) {           
            const pieceRegex = /[rnbqkp]/i;

            if (pieceRegex.test(fenSplit[i][j])) {
                board.push(fenSplit[i][j]);
            } else {
                for (let y = 0; y < parseInt(fenSplit[i][j], 10); y++) {
                    board.push(null);
                }
            }
        }
    }

    return board;
};

const boardState = FENparser(newGameFEN);
console.log(boardState);

// Render pieces
const pieceParser = (key) => {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('type', key)
    switch (key) {
        case 'r':
            imgElement.src = './images/rd.png';
            break;
        case 'n':
            imgElement.src = './images/nd.png';
            break;
        case 'b':
            imgElement.src = './images/bd.png';
            break;
        case 'q':
            imgElement.src = './images/qd.png';
            break;
        case 'k':
            imgElement.src = './images/kd.png';
            break;
        case 'p':
            imgElement.src = './images/pd.png';
            break;
        case 'R':
            imgElement.src = './images/rl.png';
            break;
        case 'N':
            imgElement.src = './images/nl.png';
            break;
        case 'B':
            imgElement.src = './images/bl.png';
            break;
        case 'Q':
            imgElement.src = './images/ql.png';
            break;
        case 'K':
            imgElement.src = './images/kl.png';
            break;
        case 'P':
            imgElement.src = './images/pl.png';
            break;
        default:
            break;
    }
    return imgElement;
};

const renderPieces = (square, index) => {
    if (boardState[index] !== null) {
        const pieceElement = pieceParser(boardState[index])
        square.appendChild(pieceElement)
    }
};


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

// Variables
const squares = [...document.querySelectorAll('.square')];
const newGameFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const startGameFEN = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R';

let fen;

// Parses Forsyth–Edwards Notation
const FENparser = (FEN) => {
    const regexGeneral = /([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)/gi;
    const fenSplit = regexGeneral.exec(FEN);
    const board = []
    for (let i = 1; i < 9; i++) {
        console.log(fenSplit[i]);
        for (let j = 0; j < fenSplit[i].length; j++) {
            const pieceRegex = /[rnbqkp]/i;
            console.log(pieceRegex.test(fenSplit[i][j]));
            if (pieceRegex.test(fenSplit[i][j])) {
                board.push(fenSplit[i][j]);
            } else {
                for (let y = 0; y < parseInt(fenSplit[i][j], 10); y++) {
                    board.push(null);
                }
            }
            console.log(fenSplit[i][j]);
        }
    }
    console.log(board);
    fen = board;
}

FENparser(startGameFEN);

console.log(squares);


const pieceParser = (key) => {
    const imgElement = document.createElement('img');
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
}

const renderPieces = () => {
    console.log(fen[1]);
    squares.forEach((square, index) => {
        if (fen[index] !== null) {
            const pieceElement = pieceParser(fen[index])
            square.appendChild(pieceElement)
            console.log(square);
            console.log(index);

        }
    })
}

renderPieces();

// Render algebraic notation to squares
const renderAlgebraicNotation = () => {
    squares.forEach(square => {
        const id = document.createElement('span');
        id.textContent = square.id;
        // console.log(square.id);
        square.appendChild(id);
    });
}
renderAlgebraicNotation();
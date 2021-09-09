const pieceParser = (key) => {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('type', key)
    switch (key) {
        case 'r':
            imgElement.id = 'b';
            imgElement.src = './images/rd.png';
            break;
        case 'n':
            imgElement.id = 'b';
            imgElement.src = './images/nd.png';
            break;
        case 'b':
            imgElement.id = 'b';
            imgElement.src = './images/bd.png';
            break;
        case 'q':
            imgElement.id = 'b';
            imgElement.src = './images/qd.png';
            break;
        case 'k':
            imgElement.id = 'b';
            imgElement.src = './images/kd.png';
            break;
        case 'p':
            imgElement.id = 'b';
            imgElement.src = './images/pd.png';
            break;
        case 'R':
            imgElement.id = 'w';
            imgElement.src = './images/rl.png';
            break;
        case 'N':
            imgElement.id = 'w';
            imgElement.src = './images/nl.png';
            break;
        case 'B':
            imgElement.id = 'w';
            imgElement.src = './images/bl.png';
            break;
        case 'Q':
            imgElement.id = 'w';
            imgElement.src = './images/ql.png';
            break;
        case 'K':
            imgElement.id = 'w';
            imgElement.src = './images/kl.png';
            break;
        case 'P':
            imgElement.id = 'w';
            imgElement.src = './images/pl.png';
            break;
        default:
            break;
    }
    return imgElement;
};

const renderPieces = (square, currentPiece) => {
    if (currentPiece !== null) {
        const pieceElement = pieceParser(currentPiece)
        square.appendChild(pieceElement)
    }
};

export default renderPieces;

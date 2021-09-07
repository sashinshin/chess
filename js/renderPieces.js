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

const renderPieces = (square, currentPiece) => {
    if (currentPiece !== null) {
        const pieceElement = pieceParser(currentPiece)
        square.appendChild(pieceElement)
    }
};

export default renderPieces;

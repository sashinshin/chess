// Parses Forsyth–Edwards Notation
export const FENparser = (FEN) => {
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
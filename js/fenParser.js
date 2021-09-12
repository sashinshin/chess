// Parses Forsyth–Edwards Notation
const fenParser = (FEN) => {
    const regexGeneral = /([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*)\/([a-z1-9]*) ([wb]) ([kq-]{1,4}) (-|[a-h1-8]{2}) ([\d]+) ([\d]+)/gmi;
    const groups = regexGeneral.exec(FEN);
    const boardState = []
    const piecePosition = groups.slice(1, 9);
    const activeColor = groups[9];
    const castling = groups[10];
    const enPassant = groups[11];
    const halfmove = groups[12];
    const fullmove = groups[13];
    const game = {
        boardState,
        activeColor,
        castling,
        enPassant,
        halfmove,
        fullmove,
        unavailableSquares: [],
    }

    console.log(piecePosition);
    const test = []
    piecePosition.forEach(row => {
        console.log(row);
        const innerTest = []
        for (let i = 0 ; i < row.length; i++) {
            const pieceRegex = /[rnbqkp]/i;

            if (pieceRegex.test(row[i])) {
                innerTest.push(row[i])
            } else {
                for (let j = 0; j < parseInt(row[i], 10); j++) {
                    innerTest.push(null);
                }
            }
            
        }



        test.push(innerTest);

    });

    console.log(test);
    console.log(test[0][1]);

    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < piecePosition[i].length; j++) {           
    //         const pieceRegex = /[rnbqkp]/i;

    //         if (pieceRegex.test(piecePosition[i][j])) {
    //             boardState.push(piecePosition[i][j]);
    //         } else {
    //             for (let y = 0; y < parseInt(piecePosition[i][j], 10); y++) {
    //                 boardState.push(null);
    //             }
    //         }
    //     }
    // }
    game.boardState = test;

    return game;
};

export default fenParser;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    const boardSize = 1000;
    
    // Write your code here
    const run = (diagonalsAllowed) => {
        const board = [];
        for (let i = 0; i < boardSize; i++) {
            board.push([]);
            for (let j = 0; j < boardSize; j++) {
                board[i].push(0);
            }
        }

        lines.forEach(line => {
            const points = line.split(' -> ');
            const [x1, y1] = points[0].split(',').map(i => parseInt(i));
            const [x2, y2] = points[1].split(',').map(i => parseInt(i));
    
            if (diagonalsAllowed || (x1 === x2 || y1 === y2)) {
                let i = x1;
                let j = y1
                while (true) {
                    board[j][i]++;
                    if (i === x2 && j === y2) {
                        break;
                    }
                    i += (x2 - x1)/Math.abs(x2 - x1) || 0;
                    j += (y2 - y1)/Math.abs(y2 - y1) || 0;
                }
            }
        });
    
        let count = 0;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[j][i] >= 2) {
                    count++;
                }
            }
        }
    
        // board.forEach(line => console.log(line.join('')));
    
        console.log(count);
    }

    run(false);
    run(true);
});

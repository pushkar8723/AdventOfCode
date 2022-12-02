process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const winMap = {
        paper: 'rock',
        rock: 'scissors',
        scissors: 'paper'
    }

    const loseMap = {
        paper: 'scissors',
        rock: 'paper',
        scissors: 'rock'
    }
    
    const opp = {
        A: 'rock',
        B: 'paper',
        C: 'scissors'
    }

    const p = {
        X: 'rock',
        Y: 'paper',
        Z: 'scissors'
    }
    const pScore = {
        rock: 1,
        paper: 2,
        scissors: 3
    }

    let score = 0;
    lines.forEach(line => {
        const [oppTurn, pTurn] = line.split(' ');
        score += pScore[p[pTurn]];
        if (opp[oppTurn] === p[pTurn]) {
            score += 3;
        } else if (winMap[opp[oppTurn]] === p[pTurn]) {
            score += 0;
        } else {
            score += 6;
        }
    });

    console.log(score);

    score = 0;

    lines.forEach(line => {
        const [oppTurn, pTurn] = line.split(' ');
        if (pTurn === 'X') {
            score += pScore[winMap[opp[oppTurn]]];
        } else if (pTurn === 'Y') {
            score += 3;
            score += pScore[opp[oppTurn]];
        } else {
            score += 6;
            score += pScore[loseMap[opp[oppTurn]]];
        }
    });

    console.log(score);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

class Dice {
    currentValue = 1;
    rolls = 0;

    getNext() {
        const returnValue = this.currentValue;
        this.currentValue = this.currentValue === 100 ? 1 : this.currentValue + 1;
        this.rolls++;
        return returnValue;
    }
}

class Node {
    pos1;
    pos2;
    score1;
    score2;
    player;
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    let pos1 = parseInt(lines[0].split(":")[1]);
    let pos2 = parseInt(lines[1].split(":")[1]);
    let score1 = 0;
    let score2 = 0;

    const dice = new Dice();

    do {
        // Player 1
        let delta1 = dice.getNext() + dice.getNext() + dice.getNext();
        let newPosition1 = (pos1 + delta1) % 10;
        newPosition1 = newPosition1 === 0 ? 10 : newPosition1;
        score1 += newPosition1;
        pos1 = newPosition1;
        // console.log('Player 1 rolls', delta1, 'moves to space', newPosition1, ' for a total score of', score1);

        if (score1 >= 1000) {
            break;
        }

        // Player 2
        let delta2 = dice.getNext() + dice.getNext() + dice.getNext();
        let newPosition2 = (pos2 + delta2) % 10;
        newPosition2 = newPosition2 === 0 ? 10 : newPosition2;
        score2 += newPosition2;
        pos2 = newPosition2;
        // console.log('Player 2 rolls', delta2, ' moves to space', newPosition2, ' for a total score of', score2);
    } while (score1 < 1000 && score2 < 1000);

    console.log(dice.rolls * score2);

    pos1 = parseInt(lines[0].split(":")[1]);
    pos2 = parseInt(lines[1].split(":")[1]);

    let win1universe = 0;
    let win2universe = 0;

    const part2 = (pos1, pos2, score1, score2, player, universeCount) => {
        const scoreAdd = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]];
        for (let score of scoreAdd) {
            if (player === 1) {
                let newPos = (pos1 + score[0]) % 10;
                newPos = newPos === 0 ? 10 : newPos;
                const newScore = score1 + newPos;
                if (newScore >= 21) {
                    win1universe += universeCount * score[1];
                } else {
                    part2(newPos, pos2, newScore, score2, 2, universeCount * score[1]);
                }
            } else {
                let newPos = (pos2 + score[0]) % 10;
                newPos = newPos === 0 ? 10 : newPos;
                const newScore = score2 + newPos;
                if (newScore >= 21) {
                    win2universe += universeCount + score[1];
                } else {
                    part2(pos1, newPos, score1, newScore, 1, universeCount * score[1]);
                }
            }
        }
    }

    part2(pos1, pos2, 0, 0, 1, 1);

    console.log(win1universe > win2universe ? win1universe : win2Universe);
});

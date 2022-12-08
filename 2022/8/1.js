process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const map = [];
    lines.forEach(line => {
        map.push(line.split('').map(i => parseInt(i)));
    });

    const checkX = (i, j, x) => {
        let max = map[i][j];
        for (let m = i + x; m >= 0 && m < map.length; m += x) {
            if (map[m][j] >= max) {
                return false;
            }
        }
        return true;
    }

    const checkY = (i, j, y) => {
        let max = map[i][j];
        for (let m = j + y; m >= 0 && m < map[i].length; m += y) {
            if (map[i][m] >= max) {
                return false;
            }
        }
        return true;
    }

    const getXScore = (i, j, x) => {
        let max = map[i][j];
        let score = 0;
        for (let m = i + x; m >= 0 && m < map.length; m += x) {
            score++;
            if (map[m][j] >= max) {
                return score;
            }
        }
        return score;
    }

    const getYScore = (i, j, y) => {
        let max = map[i][j];
        let score = 0;
        for (let m = j + y; m >= 0 && m < map[i].length; m += y) {
            score++;
            if (map[i][m] >= max) {
                return score;
            }
        }
        return score;
    }

    let count = 0;
    let maxScore = 0;
    for (let i = 1; i < map.length - 1; i++) {
        for (let j = 1; j < map[i].length - 1; j++) {
            if (checkX(i, j, -1) || checkX(i, j, +1) || checkY(i, j, +1) || checkY(i, j, -1)) {
                count++;
                const currentScore = getXScore(i, j, -1) * getXScore(i, j, 1) * getYScore(i, j, -1) * getYScore(i, j, 1);
                if (currentScore > maxScore) {
                    maxScore = currentScore;
                }
            }
        }
    }

    console.log(count + 2*map.length + 2*(map.length - 2));
    console.log(maxScore);
});

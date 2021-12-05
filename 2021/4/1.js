process.stdin.resume();
process.stdin.setEncoding('utf8');

class Board {
    numbers = [];
    row = [0,0,0,0,0];
    column = [0,0,0,0,0];
    map = new Map();

    constructor(numbers) {
        this.numbers = numbers;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.map.set(numbers[i][j], [i, j]);
            }
        }
    }

    mark = (number) => {
        if (this.map.has(number)) {
            const [row, column] = this.map.get(number);
            this.row[row]++;
            this.column[column]++;
            this.map.delete(number);
        }
    }

    hasWon = () => {
        return this.row.includes(5) || this.column.includes(5);
    }

    getSum = () => {
        return [...this.map.keys()].reduce((acc, curr) => acc + curr, 0);
    }
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const sequence = lines[0].split(',').map(i => parseInt(i));
    const boards = [];

    for (let i = 1; i < lines.length; i += 5) {
        const board = [
            lines[i].split(' ').filter(i => i).map(i => parseInt(i)),
            lines[i + 1].split(' ').filter(i => i).map(i => parseInt(i)),
            lines[i + 2].split(' ').filter(i => i).map(i => parseInt(i)),
            lines[i + 3].split(' ').filter(i => i).map(i => parseInt(i)),
            lines[i + 4].split(' ').filter(i => i).map(i => parseInt(i)),
        ];
        boards.push(new Board(board));
    }

    const playBingo = () => {
        const score = []
        for (const number of sequence) {
            for (let i = boards.length - 1; i >= 0; i--) {
                boards[i].mark(number);
                if (boards[i].hasWon()) {
                    score.push(boards[i].getSum() * number);
                    boards.splice(i, 1);
                }
            }
            if (boards.length === 0) {
                break;
            }
        }
        return [score[0], score[score.length - 1]];
    }

    const [part1, part2] = playBingo();

    console.log(part1);
    console.log(part2);
});

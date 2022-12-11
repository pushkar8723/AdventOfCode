process.stdin.resume();
process.stdin.setEncoding('utf8');

/**
 * @type {Monkey[]}
 */
let monkeys = [];
let superModulo = 1;

class Monkey {
    items = [];
    operationType;
    b;
    checkBy;
    passTrue; passFalse;
    inspections = 0;
    
    constructor(items, operationType, b, checkBy, passTrue, passFalse) {
        this.items = items;
        this.operationType = operationType;
        this.b = b;
        this.checkBy = checkBy;
        this.passTrue = passTrue;
        this.passFalse = passFalse;
    }

    addItem(item) {
        this.items.push(item);
    }

    inspectItem(part1) {
        let currentItem = this.items.shift();
        const y = this.b === 'old' ? currentItem : parseInt(this.b);
        if (this.operationType === '+') {
            currentItem += y;
        } else {
            currentItem *= y;
        }

        if (part1) {
            currentItem = Math.floor(currentItem / 3);
        } else {
            currentItem %= superModulo;
        }

        if (currentItem % this.checkBy === 0) {
            monkeys[this.passTrue].addItem(currentItem);
        } else {
            monkeys[this.passFalse].addItem(currentItem);
        }
        this.inspections++;
    }

    play(part1) {
        while(this.items.length) {
            this.inspectItem(part1);
        }
    }
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const parseInput = () => {
        superModulo = 1;
        for (let i = 0; i < lines.length; i += 6) {
            // const monkeyIdx = parseInt(lines[i].match(/\d+/g)[0]);
            const items = lines[i + 1].match(/\d+/g).map(i => parseInt(i));
            const [op, b] = lines[i+2].split(' = ')[1].split(' ').splice(1);
            const checkBy = parseInt(lines[i + 3].match(/\d+/g)[0]);
            const passTrue = parseInt(lines[i + 4].match(/\d+/g)[0]);
            const passFalse = parseInt(lines[i + 5].match(/\d+/g)[0]);
    
            monkeys.push(new Monkey(items, op, b, checkBy, passTrue, passFalse));
            superModulo *= checkBy;
        }
    }

    parseInput();

    for (let round = 1; round <= 20; round++) {
        monkeys.forEach(monkey => monkey.play(true));
    }

    const inspections1 = monkeys.map(monkey => monkey.inspections).sort((a, b) => b - a);
    console.log(inspections1[0] * inspections1[1]);

    monkeys = [];
    parseInput();

    for (let round = 1; round <= 10000; round++) {
        monkeys.forEach(monkey => monkey.play(false));
    }

    const inspections2 = monkeys.map(monkey => monkey.inspections).sort((a, b) => b - a);
    console.log(inspections2[0] * inspections2[1]);
});

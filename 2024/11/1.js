process.stdin.resume();
process.stdin.setEncoding('utf8');

function node (data) {
    this.data = data;
    this.next = null;
};

const print = (head) => {
    let curr = head;
    while (curr) {
        process.stdout.write(`${curr.data} `);
        curr = curr.next;
    }
    process.stdout.write('\n');
}

const count = (head) => {
    let curr = head;
    let count = 0;
    while (curr) {
        count++;
        curr = curr.next;
    }
    return count;
}

const process1 = (head) => {
    let current = head;
    while (current !== null) {
        if (current.data === 0) {
            current.data = 1;
            current = current.next;
        } else if (current.data.toString().length % 2 === 0) {
            const data = current.data.toString();
            const first = parseInt(data.slice(0, data.length / 2));
            const second = parseInt(data.slice(data.length / 2));
            current.data = first;
            const newNode = new node(second);
            newNode.next = current.next;
            current.next = newNode;
            current = newNode.next;
        } else {
            current.data *= 2024;
            current = current.next;
        }
    }
};

const process2 = (stones) => {
    const addStone = (stone, count, map) => {
        if (map.has(stone)) {
            map.set(stone, map.get(stone) + count);
        } else {
            map.set(stone, count);
        }
    }

    let stonesMap = new Map();
    for (let i = 0; i < stones.length; i++) {
        addStone(stones[i], 1, stonesMap);
    }

    for (let i = 1; i <= 75; i++) {
        let newStones = new Map();
        stonesMap.forEach((count, stone) => {
            if (stone === 0) {
                addStone(1, count, newStones);
            } else if (stone.toString().length % 2 === 0) {
                const data = stone.toString();
                const first = parseInt(data.slice(0, data.length / 2));
                const second = parseInt(data.slice(data.length / 2));
                addStone(first, count, newStones);
                addStone(second, count, newStones);
            } else {
                addStone(stone * 2024, count, newStones);
            }
        })
        stonesMap = newStones;
    }

    return [...stonesMap.values()].reduce((acc, curr) => acc + curr, 0);
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    const numbers = lines[0].split(' ').map(Number);
    const head = new node(numbers[0]);
    let current = head;
    for (let i = 1; i < numbers.length; i++) {
        current.next = new node(numbers[i]);
        current = current.next;
    }

    // print(head);

    for (let i = 1; i <= 25; i++) {
        process1(head);
    }

    console.log(count(head));
    console.log(process2(numbers));
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

function space(type, size, id, prev) {
    this.type = type;
    this.size = size;
    this.id = id;
    this.prev = prev;
    this.next = null;
}

const printLL = (head) => {
    let curr = head;
    while (curr) {
        console.log(curr.type, curr.size, curr.id);
        curr = curr.next;
    }
}

const printLLBack = (end) => {
    let curr = end;
    while (curr) {
        console.log(curr.type, curr.size, curr.id);
        curr = curr.prev;
    }
}

const calculate = (head) => {
    let ans = 0;
    let i = 0;
    let curr = head;

    while (curr) {
        if (curr.type === 'used') {
            for (let j = 0; j < curr.size; j++) {
                ans += curr.id * i;
                i++;
            }
        } else {
            i += curr.size;
        }
        curr = curr.next;
    }

    return ans;
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const digits = lines[0].split('').map(Number);

    let id = 0;
    const head = new space('used', digits[0], id++, null);
    let ptr = head;

    for (let i = 1; i < digits.length; i++) {
        ptr.next = new space(i % 2 === 0 ? 'used': 'free', digits[i], i % 2 === 0 ? id++ : '.', ptr);
        ptr = ptr.next;
    }
    let end = ptr;

    while (end) {
        if (end.type === 'used') {
            // console.log('>', end.type, end.size, end.id);
            let curr = head;
            while (curr && curr !== end && (curr.type !== 'free' || curr.size < end.size)) {
                curr = curr.next;
            }
            if (curr === end) {
                end = end.prev;
                continue;
            }
            if (curr) {
                const x = curr.prev;
                const y = curr.next;

                if (curr.size > end.size) {
                    const newSpace = new space('used', end.size, end.id, x);
                    const remainingSpace = new space('free', curr.size - end.size, '.', newSpace);
                    newSpace.next = remainingSpace;
                    x.next = newSpace;
                    remainingSpace.next = y;
                    y.prev = remainingSpace;
                } else {
                    curr.type = 'used';
                    curr.id = end.id;
                }
                end.type = 'free';
                end.id = '.';
            }
        } else {
            // console.log('> noop');
        }
        end = end.prev;
    }

    console.log(calculate(head));
});

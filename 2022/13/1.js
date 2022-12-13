process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const pairs = chunk.toString().split('\n\n').filter(item => item);
    // Write your code here
    
    let sum = 0;

    const compare = (first, second) => {
        // console.log(first, second);
        if (typeof first === 'number' && typeof second === 'number') {
            if (first < second) {
                return 1;
            } else if (first === second) {
                return 0;
            } else {
                return -1
            }
        } else if (typeof first === 'number' && Array.isArray(second)) {
            return compare([first], second);
        } else if (Array.isArray(first) && typeof second === 'number') {
            return compare(first, [second]);
        } else {
            for (let i = 0; i < first.length && i < second.length; i++) {
                const val = compare(first[i], second[i]);
                if (val === 1) {
                    return 1;
                } else if (val === -1) {
                    return -1;
                }
            }
            if (first.length < second.length) {
                return 1;
            }
    
            if (first.length > second.length) {
                return -1;
            }

            return 0;
        }
    }

    let packets = [];

    pairs.forEach((pair, idx) => {
        const [first, second] = pair.split('\n').map(i => eval(i));
        const val = compare(first, second);
        // console.log('x', idx + 1, val);
        if (val === 1) {
            sum += idx + 1;
        }
        packets.push(first, second);
    });

    packets.push([[2]], [[6]]);

    console.log(sum);
    packets = packets.sort((a, b) => -1 * compare(a, b));

    let key = 1;
    for (let i = 0; i < packets.length; i++) {
        if (JSON.stringify(packets[i]) === '[[2]]' || JSON.stringify(packets[i]) === '[[6]]') {
            key *= i + 1;
        }
    }

    console.log(key);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const getDistinctCharacterIndex = (input, n) => {
        const window = new Map();
        let i;
        for (i = 0; i < input.length; i++) {
            const curr = input[i];
            if (window.has(curr)) {
                window.set(curr, window.get(curr) + 1);
            } else {
                window.set(curr, 1);
            }

            if (i >= n) {
                const remove = input[i - n];
                if (window.get(remove) === 1) {
                    window.delete(remove);
                } else {
                    window.set(remove, window.get(remove) - 1);
                }
            }

            if (window.size === n) {
                break;
            }
        }

        return i + 1;
    }

    console.log(getDistinctCharacterIndex(lines[0], 4));
    console.log(getDistinctCharacterIndex(lines[0], 14));
});

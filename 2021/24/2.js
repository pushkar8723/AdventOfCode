process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const stack = [];
    const part1 = new Array(14);
    const part2 = new Array(14);
    
    for (let i = 0; i < 14; i++) {
        const q = parseInt(lines[i*18 + 4].split(' ')[2]);
        const n1 = parseInt(lines[i*18 + 5].split(' ')[2]);
        const n2 = parseInt(lines[i*18 + 15].split(' ')[2]);

        if (q === 1) {
            stack.push([i, n2]);
        } else if (q === 26) {
            const [a, x] = stack.pop();
            if (x + n1 < 0) {
                part1[a] = 9;
                part1[i] = 9 + x + n1;

                part2[i] = 1;
                part2[a] = 1 - x - n1; 
            } else {
                part1[i] = 9;
                part1[a] = 9 - x - n1;

                part2[a] = 1;
                part2[i] = 1 + x + n1;
            }
        }
    }
    console.log(part1.join(''));
    console.log(part2.join(''));
});

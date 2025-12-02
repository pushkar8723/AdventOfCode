process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let pointer = 50;
    let part1 = 0;
    let part2 = 0;

    lines.forEach(line => {
        const [dir, x] = [line.substring(0, 1), parseInt(line.substring(1, line.length))];
        
        const delta = dir === 'L' ? -1 : 1;
        
        for (let i = 0; i < x; i++) {
            pointer += delta;
            if (pointer < 0) pointer = 99;
            if (pointer > 99) pointer = 0;

            if (pointer === 0) {
                part2 += 1;
            }
        }

        if (pointer === 0) {
            part1 += 1;
        }
    });

    console.log(part1);
    console.log(part2);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n');
    // Write your code here
    const stacks = {};
    let lineIdx;
    for (lineIdx = 0; lineIdx < lines.length && lines[lineIdx]; lineIdx++) {
        for (let i = 1; i < lines[lineIdx].length; i += 4) {
            if (/[A-Z]/.test(lines[lineIdx][i])) {
                const stackIdx = Math.floor(i/4 + 1);
                if (!stacks[stackIdx]) {
                    stacks[stackIdx] = [];
                }
                stacks[stackIdx].unshift(lines[lineIdx][i]);
            }
        }
    }
    lineIdx++;
    // console.log(stacks);
    let part2Idx = lineIdx;
    const part2stacks = {};
    Object.keys(stacks).forEach(key => {
        part2stacks[key] = [...stacks[key]];
    });

    for (; lineIdx < lines.length && lines[lineIdx]; lineIdx++) {
        const line = lines[lineIdx];
        const [count, from, to] = line.match(/[\d]+/g).map(i => parseInt(i));
        
        const items = stacks[from].splice(-1 * count).reverse();
        stacks[to].push(...items);
    }

    Object.values(stacks).forEach(stack => {
        process.stdout.write(stack[stack.length -1]);
    });
    process.stdout.write('\n');

    for (; part2Idx < lines.length && lines[part2Idx]; part2Idx++) {
        const line = lines[part2Idx];
        const [count, from, to] = line.match(/[\d]+/g).map(i => parseInt(i));
        
        const items = part2stacks[from].splice(-1 * count);
        part2stacks[to].push(...items);
    }

    Object.values(part2stacks).forEach(stack => {
        process.stdout.write(stack[stack.length -1]);
    });
    process.stdout.write('\n');
});

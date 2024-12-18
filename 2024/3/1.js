process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let sum = 0n;
    lines.forEach(line => {
        const matches = Array.from(line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g));
        matches.forEach(match => {
            console.log(match[0]);
            sum += (BigInt(match[1]) * BigInt(match[2]));
        });
    });

    console.log(sum);

    let sum2 = 0n;
    let enabled = true;
    lines.forEach(line => {
        const matches = Array.from(line.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g));
        matches.forEach(match => {
            if (match[0] === 'do()') {
                enabled = true;
            } else if (match[0] === "don't()") {
                enabled = false;
            } else {
                if (enabled) {
                    sum2 += (BigInt(match[1]) * BigInt(match[2]));
                }
            }
        });
    });

    console.log(sum2);
});

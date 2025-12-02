process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const ranges = lines[0].split(',');

    let sum = 0;
    ranges.forEach(range => {
        const [start, end] = range.split('-').map(num => parseInt(num));
        for (let i = start; i <= end; i++) {
            const numStr = i.toString();
            if (/^(.+)\1+$/.test(numStr)) {
                sum += i;
            }
        }
    });
    console.log(sum);
});

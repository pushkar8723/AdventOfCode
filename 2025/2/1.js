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
            if (numStr.length % 2 === 0) {
                const mid = numStr.length / 2;
                const firstHalf = numStr.substring(0, mid);
                const secondHalf = numStr.substring(mid);
                if (firstHalf === secondHalf) {
                    sum += i;
                }
            }
        }
    });
    console.log(sum);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const positions = lines[0].split(',').map(i => parseInt(i));
    const max = Math.max(...positions);
    const min = Math.min(...positions);
    let minFuel = Infinity;
    for (let i = min; i <= max; i++) {
        let sum = 0;
        for (const pos of positions) {
            sum += Math.abs(pos - i);
        }
        if (sum < minFuel) {
            minFuel = sum;
        }
    }
    console.log(minFuel);

    minFuel = Infinity;
    for (let i = min; i <= max; i++) {
        let sum = 0;
        for (const pos of positions) {
            const moves = Math.abs(pos - i);
            sum += moves * (moves + 1) / 2;
        }
        if (sum < minFuel) {
            minFuel = sum;
        }
    }
    console.log(minFuel);
});

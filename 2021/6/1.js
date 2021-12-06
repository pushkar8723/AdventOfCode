process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const fishes = lines[0].split(',').map(i => parseInt(i));

    const day = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    fishes.forEach(fish => {
        day[fish]++;
    })

    let count = fishes.length;

    for (let i = 1; i <= 256; i++) {
        if (day[0] > 0) {
            count += day[0];
            day.push(day[0]);
            day[7] += day[0];
        } else {
            day.push(0);
        }
        day.shift(1);
        if (i === 80) {
            console.log(count);
        }
    }

    console.log(count);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let contain = 0;
    lines.forEach(line => {
        const [range1, range2] = line.split(',');
        const [x1, y1] = range1.split('-').map(i => parseInt(i));
        const [x2, y2] = range2.split('-').map(i => parseInt(i));
        if ((x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1)) {
            contain++;
        }
    });
    console.log(contain);

    let overlap = 0;
    lines.forEach(line => {
        const [range1, range2] = line.split(',');
        const [x1, y1] = range1.split('-').map(i => parseInt(i));
        const [x2, y2] = range2.split('-').map(i => parseInt(i));
        if ((x1 <= x2 && x2 <= y1) || (x2 <= x1 && x1 <= y2)) {
            overlap++;
        }
    });
    console.log(overlap);
});

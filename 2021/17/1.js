process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const [x1, x2, y1, y2] = lines[0].match(/[-\d]+/g).map(i => parseInt(i));
    
    const n = Math.abs(Math.min(y1, y2)) - 1;
    const maxY = n*(n+1)/2;
    console.log(maxY);

    const maxX = Math.floor((x2 + 1)/2);
    console.log(maxX);

    let i = 1;
    for (; i < maxX; i++) {
        const reach = i*(i+1)/2;
        if (reach >= x1) {
            break;
        } 
    }
});

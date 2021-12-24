process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const points = new Set();
    const folds = [];
    lines.forEach(line => {
        if (line.includes(',')) {
            points.add(line);
        } else if (line.startsWith('fold along ')) {
            const [axis, n] = line.substr(11).split('=');
            folds.push([axis, parseInt(n)]);
        }
    });

    // console.log(points);
    // console.log(folds);

    const execFold = (axis, n) => {
        const newPoints = [];
        const delPoints = [];
        points.forEach(point => {
            const [x, y] = point.split(',').map(i => parseInt(i));
            if (axis === 'x') {
                if (x > n) {
                    const newX = n - (x - n);
                    newPoints.push(`${newX},${y}`);
                    delPoints.push(point);
                }
            } else if (axis === 'y') {
                if (y > n) {
                    const newY = n - (y - n);
                    newPoints.push(`${x},${newY}`);
                    delPoints.push(point);
                }
            }
        });
        delPoints.forEach(point => points.delete(point));
        newPoints.forEach(point => points.add(point));
    }

    execFold(folds[0][0], folds[0][1]);
    console.log(points.size);

    for (i = 1; i < folds.length; i++) {
        const [axis, n] = folds[i];
        execFold(axis, n);
    }

    let maxX = 0;
    let maxY = 0;
    points.forEach(point => {
        const [x, y] = point.split(',').map(i => parseInt(i));
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    });

    const paper = new Array(maxY + 1);
    for (let j = 0; j <= maxY; j++) {
        paper[j] = [];
        for (let i = 0; i <= maxX; i++) {
            paper[j].push(' ');
        }
    }

    points.forEach(point => {
        const [x, y] = point.split(',').map(i => parseInt(i));
        paper[y][x] = '#';
    });

    paper.forEach(line => console.log(line.join('')));
});

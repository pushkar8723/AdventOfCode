process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    let maxX = 0;

    lines.forEach(line => {
        const wall = line.split(' -> ').map(i => i.split(',').map(i => parseInt(i)));
        wall.forEach(([y, x]) => {
            maxX = Math.max(x, maxX);
        })
    });

    const maxY = 500 + maxX + 2;
    const minY = 500 - maxX - 2;

    let map = new Array(maxX + 2);
    for (let i = 0; i <= maxX + 2; i++) {
        map[i] = new Array(maxY - minY + 1);
    }

    // console.log(maxX, minY, maxY, map.length);

    const printMap = () => {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                process.stdout.write(map[y][x] ? map[y][x] : '.');
            }
            process.stdout.write('\n');
        }
    }

    lines.forEach(line => {
        const wall = line.split(' -> ').map(i => i.split(',').map(i => parseInt(i)));
        for (let i = 1; i < wall.length; i++) {
            const y1 = wall[i-1][0];
            const y2 = wall[i][0];
            const x1 = wall[i-1][1];
            const x2 = wall[i][1];
            const dy = Math.abs(y1 - y2);
            const dx = Math.abs(x1 - x2);
            const dmax = Math.max(dx, dy);
            // console.log(y1, y2, x1, x2, dy, dx);
            for (let j = 0; j <= dmax; j++) {
                const y = y2 + j*((y1 - y2)/dmax) - minY;
                const x = x2 + j*((x1 - x2)/dmax);
                // console.log(y, x);
                map[x][y] = '#';
            }
        }
    });

    for (let i = 0; i < map[map.length - 1].length; i++) {
        map[map.length - 1][i] = '#';
    }

    // printMap();

    const fillSand = () => {
        let sandSettle = true;
        let start = [0, 500 - minY];
        let settled = 0;
        let sandParticle;
        do {
            if (sandSettle) {
                const [x, y] = start;
                if (map[x][y] === 'o') {
                    break;
                }
                sandParticle = [x, y];
                sandSettle = false;
            } else {
                const [x, y] = sandParticle;
                if (!map[x+1][y]) {
                    sandParticle = [x+1, y];
                    sandSettle = false;
                } else if (!map[x+1][y-1]) {
                    sandParticle = [x+1, y-1];
                    sandSettle = false;
                } else if (!map[x+1][y+1]) {
                    sandParticle = [x+1, y+1];
                    sandSettle = false;
                } else {
                    map[x][y] = 'o';
                    sandParticle = start;
                    sandSettle = true;
                    settled++;
                    // printMap();
                }
            }
            // console.log(sandParticle);
        } while(true);
        console.log(settled);
    }

    fillSand();
});

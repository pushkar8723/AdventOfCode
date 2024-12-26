process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const WIDTH = 101;
    const HEIGHT = 103;
    const WIDTH_MID = Math.floor(WIDTH / 2);
    const HEIGHT_MID = Math.floor(HEIGHT / 2);
    
    const positions = [];
    const velocities = [];
    const qadrants = [0, 0, 0, 0];

    const getFinalPosition = ([x, y], [dx, dy], time) => {
        const [fx, fy] = [x + dx * time, y + dy * time];
        return[
            Math.abs(fx % WIDTH >= 0 ? fx % WIDTH : WIDTH - Math.abs(fx % WIDTH)),
            Math.abs(fy % HEIGHT >= 0 ? fy % HEIGHT : HEIGHT - Math.abs(fy % HEIGHT)),
        ];
    }

    const findMap = (positions) => {
        const map = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => ' '));
        positions.forEach(([x, y]) => {
            map[y][x] = '#';
        });
        const str = map.map(row => row.join(''));
        return str.join('\n').includes('###############################');
    }

    lines.map(line => {
        const [_, px, py, vx, vy] = line.match(/p=([-|\d]+),([-|\d]+) v=([-|\d]+),([-|\d]+)/);
        const [x, y, dx, dy] = [px, py, vx, vy].map(Number);
        
        positions.push([x, y]);
        velocities.push([dx, dy]);
        const finalPosition = getFinalPosition([x, y], [dx, dy], 100);

        if (finalPosition[0] < WIDTH_MID && finalPosition[1] < HEIGHT_MID) {
            qadrants[0]++;
        } else if (finalPosition[0] > WIDTH_MID && finalPosition[1] < HEIGHT_MID) {
            qadrants[1]++;
        } else if (finalPosition[0] < WIDTH_MID && finalPosition[1] > HEIGHT_MID) {
            qadrants[2]++;
        } else if (finalPosition[0] > WIDTH_MID && finalPosition[1] > HEIGHT_MID) {
            qadrants[3]++;
        }
    });

    console.log(qadrants.reduce((acc, curr) => acc * curr, 1));

    let i = 1;
    while (true) {
        const newPositions = positions.map(([x, y], index) => {
            const [dx, dy] = velocities[index];
            return getFinalPosition([x, y], [dx, dy], i);
        });
        if (findMap(newPositions)) {
            break;
        }
        i++;
    }
    console.log(i);
    
});

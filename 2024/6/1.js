process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const directionsStr = ['^', '>', 'v', '<'];

    const getGuard = (map) => {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === '^') {
                    return [i, j];
                }
            }
        }
    }

    // const printMap = (map) => {
    //     map.forEach(row => console.log(row.join('')));
    //     console.log('----');
    // }

    const countPositions = (map) => {
        let count = 0;
        map.forEach(row => {
            row.forEach(cell => {
                if (directionsStr.includes(cell)) {
                    count++;
                }
            })
        });
        return count;
    }

    const simulate = (map) => {
        let currentDirection = 0;
        let [x, y] = getGuard(map);
        while (x >= 0 && y >= 0 && x < map.length && y < map[0].length) {
            map[x][y] = directionsStr[currentDirection];
            while(true) {
                const [x1, y1] = [x + directions[currentDirection][0], y + directions[currentDirection][1]];
                if (map[x1]?.[y1] === '#') {
                    currentDirection = (currentDirection + 1) % 4;
                } else {
                    break; 
                }
            }
            [x, y] = [x + directions[currentDirection][0], y + directions[currentDirection][1]];
            if(map[x]?.[y] === directionsStr[currentDirection]) {
                break;
            }
        }

        return (x >= 0 && y >= 0 && x < map.length && y < map[0].length);
    }
    
    const map = lines.map(line => line.split(''));
    simulate(map);
    console.log(countPositions(map));

    let count = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            // Reset map
            const map = lines.map(line => line.split(''));
            if (map[i][j] !== '^' && map[i][j] !== '#') {
                map[i][j] = '#';
                if (simulate(map)) {
                    // printMap(map);
                    count++;
                }
            }
        }
    }
    console.log(count);
});

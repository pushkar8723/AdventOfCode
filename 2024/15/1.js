process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    let [map, moves] = chunk.toString().split('\n\n').filter(item => item);
    // Write your code here

    map = map.split('\n').map(item => item.split(''));
    moves = moves.split('\n').join('').split('');

    const cloneMap = (map) =>  {
        return [...map].map(item => [...item]);
    }

    const findBot = (map) => {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === '@') {
                    return [i, j];
                }
            }
        }
    }

    const calculateScore = (map) => {
        let ans = 0;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 'O') {
                    ans += i * 100 + j;
                }
            }
        }
        return ans;
    }

    const printMap = (map) => {
        for (let i = 0; i < map.length; i++) {
            console.log(map[i].join(''));
        }
    }

    const moveBot = (map, x, y, direction) => {
        let dx, dy;
        let cx = x, cy = y;
        switch (direction) {
            case '^':
                dx = -1;
                dy = 0;
                break;
            case 'v':
                dx = 1;
                dy = 0;
                break;
            case '<':
                dx = 0;
                dy = -1;
                break;
            case '>':
                dx = 0;
                dy = 1;
                break;
        }
        
        do {
            cx += dx;
            cy += dy;
        } while (map[cx][cy] !== '.' && map[cx][cy] !== '#');

        if (map[cx][cy] === '#') {
            return { map, position: [x, y] };
        } else {
            dx *= -1;
            dy *= -1;
            let nx = cx, ny = cy;
            while (true) {
                nx += dx;
                ny += dy;
                map[cx][cy] = map[nx][ny];
                if (map[cx][cy] !== '@') {
                    cx = nx;
                    cy = ny;
                } else {
                    map[nx][ny] = '.';
                    return { map, position: [cx, cy] };
                }
            }
        }
    }

    const moveBot2 = (map, x, y, direction) => {
        let steps = Math.floor(map[x][y] / 5);
        if (steps > 30) return [x, y]; // Cannot move more than 30 cells
        let dx = 1;
        let dy = 1;
        
        const cx = x,
            cy = y;

        while (steps--) {
            switch (direction) {
                case 'east':
                    if (cx + dx < map.length && !map[cx + dx][cy]) break;
                    dx = 0;
                    break;
                case 'south':
                    if (cy + dy < map.length && !map[cx][cy + dy]) break;
                    dy = 0;
                    break;
            }
            [x, y] = [cx += dx, cy += dy];
        }

        return [x, y];
    };

    const simulate = (map, moves) => {
        let clonedMap = cloneMap(map);
        let [x, y] = findBot(map);
        for (let i = 0; i < moves.length; i++) {
            console.log('Move:', moves[i]);
            const { map: newMap, position } = moveBot(clonedMap, x, y, moves[i]);
            printMap(newMap);
            clonedMap = newMap;
            [x, y] = position;
        }
        return clonedMap;
    }

    // printMap(map);
    const finalMap = simulate(map, moves);
    // printMap(finalMap);
    console.log(calculateScore(finalMap));

    const map2 = map.map(row => row.map(cell => {
        if (cell === '#') {
            return ['#', '#'];
        } else if (cell === 'O') {
            return ['[', ']'];
        } else if (cell === '.') {
            return ['.', '.'];
        } else if (cell === '@') {
            return ['@', '.'];
        }
    }).flat());

    // printMap(map2);
    // const finalMap2 = simulate(map2, moves);    
    // printMap(finalMap2);
});

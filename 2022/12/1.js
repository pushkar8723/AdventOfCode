process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    const map = lines.map(line => line.split(''));
    
    let start, end;
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (map[x][y] === 'S') {
                start = { x, y };
                map[x][y] = 'a';
            } else if (map[x][y] === 'E') {
                end = { x, y };
                map[x][y] = 'z';
            }
        }
    }
    
    let visited = new Set();
    const c = (char) => char.charCodeAt(0);
    const check = (x, y, curr) => (
        !visited.has(`${x},${y}`) && 
        x >= 0 && x < map.length && y >= 0 && y < map[x].length &&
        c(map[x][y]) <= curr + 1
    );
    
    const bfs = (s, e, steps = 0) => {
        const q = [{ point: s, level: steps}];
        while (q.length) {
            const { point: { x, y }, level } = q.shift();
            // console.log(x, y, level);
            if (visited.has(`${x},${y}`)) {
                continue;
            }
            if (x === e.x && y === e.y) {
                return level;
            }
            const curr = c(map[x][y]);
            visited.add(`${x},${y}`);
            if (check(x + 1, y, curr)) {
                // console.log(x + 1, y);
                q.push({
                    point: { x: x + 1, y },
                    level: level + 1
                });
            }
            if (check(x - 1, y, curr)) {
                // console.log(x - 1, y);
                q.push({
                    point: { x: x - 1, y },
                    level: level + 1
                });
            }
            if (check(x, y + 1, curr)) {
                // console.log(x, y + 1);
                q.push({
                    point: { x, y: y + 1 },
                    level: level + 1
                });
            }
            if (check(x, y - 1, curr)) {
                // console.log(x, y - 1);
                q.push({
                    point: { x, y: y - 1 },
                    level: level + 1
                });
            }
        }
    }

    console.log(bfs(start, end));

    let part2 = Infinity;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if(map[i][j] === 'a') {
                visited = new Set();
                const ans = bfs({ x: i, y: j}, end);
                if (ans < part2) {
                    part2 = ans;
                }
            }
        }
    }
    console.log(part2);
});

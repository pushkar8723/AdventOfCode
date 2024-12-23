process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const map = lines.map(i => i.split(''));

    const visited = new Set();

    function Edge(a, b, dir, id) {
        this.point = [a, b];
        this.dir = dir;
        this.id = id;
    }

    const reduceSides = ([...sides]) => {
        for (let i = 0; i < sides.length; i++) {
            for (let j = i + 1; j < sides.length; j++) {
                const a = sides[i];
                const b = sides[j];

                if (a.dir === b.dir && (a.point.includes(b.point[0]) || a.point.includes(b.point[1]))) {
                    b.id = a.id;
                }
            }
        }
        const idSet = new Set();
        for (let i = 0; i < sides.length; i++) {
            idSet.add(sides[i].id);
        }
        return idSet.size;
    }

    const bfs = (i, j) => {
        const queue = [[i, j]];
        let area = 0;
        let perimeter = 0;
        let sides = 0;

        const edges = [];
        let id = 1;
        while (queue.length) {
            const [x, y] = queue.shift();
            if (visited.has(`${x}:${y}`)) {
                continue;
            }
            visited.add(`${x}:${y}`);

            area++;
            if (map[x - 1]?.[y] === map[x][y]) {
                if (!visited.has(`${x - 1}:${y}`)) {
                    queue.push([x - 1, y]);
                }
            } else {
                perimeter++;
                edges.push(new Edge(`${x},${y}`, `${x},${y+1}`, '-*', id++));
            }

            if (map[x + 1]?.[y] === map[x][y]) {
                if (!visited.has(`${x + 1}:${y}`)) {
                    queue.push([x + 1, y]);
                }
            } else {
                perimeter++;
                edges.push(new Edge(`${x+1},${y}`, `${x+1},${y+1}`, '*-', id++));
            }

            if (map[x][y - 1] === map[x][y]) {
                if (!visited.has(`${x}:${y - 1}`)) {
                    queue.push([x, y - 1]);
                }
            } else {
                perimeter++;
                edges.push(new Edge(`${x},${y}`, `${x+1},${y}`, '|*', id++));
            }

            if (map[x][y + 1] === map[x][y]) {
                if (!visited.has(`${x}:${y + 1}`)) {
                    queue.push([x, y + 1]);
                }
            } else {
                perimeter++;
                edges.push(new Edge(`${x},${y+1}`, `${x+1},${y+1}`, '*|', id++));
            }
        }
        sides = reduceSides(edges);
        return { area, perimeter, sides };
    }

    let ans1 = 0;
    let ans2 = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (visited.has(`${i}:${j}`)) {
                continue;
            }

            const { area, perimeter, sides } = bfs(i, j);
            console.log(map[i][j], area, sides);
            ans1 += area * perimeter;
            ans2 += area * sides;
        }
    }

    console.log(ans1);
    console.log(ans2);
});

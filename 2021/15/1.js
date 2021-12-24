process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const grid = [];
    lines.forEach(line => {
        grid.push(line.split('').map(i => parseInt(i)));
    });
    
    const size = grid.length;
    const newMap = new Array(size * 5);
    for (let i = 0; i < size*5; i++) {
        newMap[i] = new Array(size*5);
        for (let j = 0; j < size*5; j++) {
            let x = grid[i % size][j % size] + Math.floor(i / size) + Math.floor(j / size);
            x = x > 9 ? x - 9 : x;
            newMap[i][j] = x;
        }
    }

    const dijikstra = (map) => {
        const size = map.length;
        const distance = new Array(size);
        for (let i = 0; i < distance.length; i++) {
            distance[i] = new Array(size);
        }
        // TODO: Implement priority queue
        const q = [];
        q.push([[0,0], 0]);
        while (q.length) {
            const [[x,y], currDist] = q.shift();
            if (distance[x][y] === undefined) {
                distance[x][y] = currDist;
                if (x - 1 >= 0 && distance[x-1][y] === undefined) {
                    q.push([[x-1, y], currDist + map[x-1][y]]);
                }
    
                if (x + 1 < size  && distance[x+1][y] === undefined) {
                    q.push([[x+1, y], currDist + map[x+1][y]]);
                }
    
                if (y - 1 >= 0 && distance[x][y-1] === undefined) {
                    q.push([[x, y-1], currDist + map[x][y-1]]);
                }
    
                if (y + 1 < size && distance[x][y+1] === undefined) {
                    q.push([[x, y+1], currDist + map[x][y+1]]);
                }
                q.sort((a, b) => a[1] - b[1]);
            }
        }
        return distance[size -1][size - 1];
    }

    console.log(dijikstra(grid));
    console.log(dijikstra(newMap));
});

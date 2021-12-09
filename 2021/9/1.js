process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const map = lines.map(line => line.split('').map(i => parseInt(i)));

    const getNeighbors = (i, j) => {
        const neighbors = [];
        if (map[i-1] && map[i-1][j] !== undefined) {
            neighbors.push(map[i-1][j]);
        }
        if (map[i+1] && map[i+1][j] !== undefined) {
            neighbors.push(map[i+1][j]);
        }
        if (map[i][j-1] !== undefined) {
            neighbors.push(map[i][j-1]);
        }
        if (map[i][j+1] !== undefined) {
            neighbors.push(map[i][j+1]);
        }
        return neighbors;
    }

    const bfs = (x, y) => {
        const q = [];
        const visited = new Set();
        q.push([x,y]);
        while (q.length) {
            const [i,j] = q.shift();
            if (!visited.has(`${i}:${j}`)) {
                visited.add(`${i}:${j}`);
                if (map[i-1] && map[i-1][j] < 9 && !visited.has(`${i-1}:${j}`)) {
                    q.push([i-1,j]);
                }
                if (map[i+1] && map[i+1][j] < 9 && !visited.has(`${i+1}:${j}`)) {
                    q.push([i+1,j]);
                }
                if (map[i][j-1] < 9 && !visited.has(`${i}:${j-1}`)) {
                    q.push([i,j-1]);
                }
                if (map[i][j+1] < 9 && !visited.has(`${i}:${j+1}`)) {
                    q.push([i,j+1]);
                }
            }
        }
        return visited.size;
    }

    let sum = 0;
    let basinSizes = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const neighbors = getNeighbors(i, j);
            if (Math.min(...neighbors) > map[i][j]) {
                sum += map[i][j] + 1;
                basinSizes.push(bfs(i, j));
            }
        }
    }
    basinSizes = basinSizes.sort((a, b) => b - a);
    console.log(sum, basinSizes[0] * basinSizes[1] * basinSizes[2]);
});

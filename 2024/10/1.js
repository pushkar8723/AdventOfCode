process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const map = lines.map(item => item.split('').map(i => parseInt(i)));

    const dfs = (x, y) => {
        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            return new Set();
        }

        if (map[x][y] === 9) {
            return new Set([`${x}:${y}`]); 
        }


        let found = new Set();
        if (map[x - 1]?.[y] === map[x][y] + 1) {
            dfs(x - 1, y).forEach(item => found.add(item));
        }
        if (map[x + 1]?.[y] === map[x][y] + 1) {
            dfs(x + 1, y).forEach(item => found.add(item));
        }
        if (map[x][y - 1] === map[x][y] + 1) {
            dfs(x, y - 1).forEach(item => found.add(item));
        }
        if (map[x][y + 1] === map[x][y] + 1) {
            dfs(x, y + 1).forEach(item => found.add(item));
        }

        return found;
    }

    const dfs1 = (x, y) => {
        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            return 0;
        }

        if (map[x][y] === 9) {
            return 1; 
        }


        let found = 0;
        if (map[x - 1]?.[y] === map[x][y] + 1) {
            found += dfs1(x - 1, y);
        }
        if (map[x + 1]?.[y] === map[x][y] + 1) {
            found += dfs1(x + 1, y);
        }
        if (map[x][y - 1] === map[x][y] + 1) {
            found += dfs1(x, y - 1);
        }
        if (map[x][y + 1] === map[x][y] + 1) {
            found += dfs1(x, y + 1);
        }

        return found;
    }

    let ans1 = 0;
    let ans2 = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 0) {
                ans1 += dfs(i, j).size;
                ans2 += dfs1(i, j);
            }
        }
    }
    console.log(ans1);
    console.log(ans2);
});

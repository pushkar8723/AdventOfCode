process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const grid = [];
    lines.forEach(line => {
        grid.push(line.split('').map(i => parseInt(i)));
    });

    const printGrid = () => {
        grid.forEach(row => console.log(row.join('')));
    }
    
        
    let flashCount = 0;
    for (let day = 1; day <= 100; day++) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                grid[i][j]++;
            }
        }
        let flashed = false;
        do {
            flashed = false;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (grid[i][j] > 9) {
                        flashCount++;

                        if (i - 1 >= 0) {
                            if (grid[i-1][j-1]) grid[i-1][j-1]++;
                            if (grid[i-1][j])   grid[i-1][j]++;
                            if (grid[i-1][j+1]) grid[i-1][j+1]++;
                        }

                        if (grid[i][j-1])   grid[i][j-1]++;
                        if (grid[i][j+1])   grid[i][j+1]++;
                        
                        if (i + 1 <= 9) {
                            if (grid[i+1][j-1]) grid[i+1][j-1]++;
                            if (grid[i+1][j])   grid[i+1][j]++;
                            if (grid[i+1][j+1]) grid[i+1][j+1]++;
                        }

                        grid[i][j] = 0;
                        flashed = true;
                    }
                }
            }
        } while (flashed);
    }

    console.log(flashCount);

    let day = 101;
    while (true) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                grid[i][j]++;
            }
        }
        let flashed = false;
        do {
            flashed = false;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (grid[i][j] > 9) {
                        flashCount++;

                        if (i - 1 >= 0) {
                            if (grid[i-1][j-1]) grid[i-1][j-1]++;
                            if (grid[i-1][j])   grid[i-1][j]++;
                            if (grid[i-1][j+1]) grid[i-1][j+1]++;
                        }

                        if (grid[i][j-1])   grid[i][j-1]++;
                        if (grid[i][j+1])   grid[i][j+1]++;
                        
                        if (i + 1 <= 9) {
                            if (grid[i+1][j-1]) grid[i+1][j-1]++;
                            if (grid[i+1][j])   grid[i+1][j]++;
                            if (grid[i+1][j+1]) grid[i+1][j+1]++;
                        }

                        grid[i][j] = 0;
                        flashed = true;
                    }
                }
            }
        } while (flashed);
        let i = 0;
        let j = 0;
        for (; i < 10; i++) {
            j = 0;
            for (; j < 10; j++) {
                if (grid[i][j] !== 0) {
                    break;
                }
            }
            if (j !== 10) {
                break;
            }
        }
        if (i === 10 && j === 10) {
            console.log(day);
            // printGrid();
            break;
        }
        day++;
    }
});

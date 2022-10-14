process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    const algoString = lines.shift();
    const grid = new Map();

    const getKey = (x, y) => `${x},${y}`;

    const simulate = (n, min, max, grid, outOfBoundsLight) => {
        const newGrid = new Map();

        /**
         * 
         * @param {number} x 
         * @param {number} y 
         * @param {Map} grid 
         */
        const getLightStatus = (x, y, grid) => {
            const key = getKey(x, y);
            return grid.has(key) ? grid.get(key) : outOfBoundsLight;
        }
    
        for (let i = min - 2; i < max + 2; i ++) {
            for (let j = min - 2; j < max + 2; j++) {
                let x = 0;
                for (k = i - 1; k <= i + 1; k++) {
                    for (l = j - 1; l <= j + 1; l++) {
                        const bit = getLightStatus(k,l, grid) === '#' ? 1 : 0;
                        x = 2 * x + bit; 
                    }
                }
                newGrid.set(getKey(i, j), algoString[x]);
            }
        }

        const newOutOfBoundsLight = outOfBoundsLight === '.' ? algoString[0] : algoString[511];

        if (n == 1) {
            return {
                min: min - 2,
                max: max + 2,
                outOfBoundsLight: newOutOfBoundsLight,
                grid: newGrid
            }
        } else {
            return simulate(n - 1, min - 2, max + 2, newGrid, newOutOfBoundsLight);
        }
    }

    const printGrid = (min, max, grid) => {
        for (let i = min; i < max; i++) {
            let line = ``;
            for (let j = min; j < max; j++) {
                line = `${line}${grid.get(getKey(i, j))}`;
                // console.log(i, j, grid.get(getKey(i,j)));
            }
            console.log(line);
        }
    }

    const countLights = (min, max, grid) => {
        let count = 0;
        for (let i = min; i < max; i++) {
            for (let j = min; j < max; j++) {
                if (grid.get(getKey(i, j)) === '#') {
                    count++;
                }
            }
        }
        return count;
    }

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            // console.log(i, j);
            grid.set(getKey(i, j), lines[i][j]);
        }
    }

    const { min: min1, max: max1, grid: part1 } = simulate(2, 0, lines.length, grid, '.');
    console.log(countLights(min1, max1, part1));

    const { min: min2, max: max2, grid: part2 } = simulate(50, 0, lines.length, grid, '.');
    // printGrid(min2, max2, part2);
    console.log(countLights(min2, max2, part2));
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const map = lines.map(line => line.split(''));
    let starPosition;

    // Initialize the first row below the starting row
    // Mark the positions where the beam starts for part 2
    for (let i = 1; i < map[0].length - 1; i++) {
        if (map[0][i] === 'S') {
            map[1][i] = '|';
            starPosition = i;
        }
    }

    let count = 0;
    // Simulate the beam's path
    // Increase the count when the beam hits a splitter
    for (let i = 2; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i-1][j] === '|' && map[i][j] === '.') {
                map[i][j] = '|';
            } else if (map[i-1][j] === '|' && map[i][j] === '^') {
                map[i][j-1] = '|';
                map[i][j+1] = '|';
                count += 1;
            }
        }
    }
    
    // Answer for part 1
    console.log(count);

    // For part 2, we need to count all possible paths the beam can take

    // Use memoization to avoid recalculating paths
    const hashMap = new Map();

    // Recursive function to traverse the map
    const traverse = (index, beamPosition) => {
        // Check if the result is already computed, return it if so
        if (hashMap.has(`${index},${beamPosition}`)) {
            return hashMap.get(`${index},${beamPosition}`);
        }

        // If we reach the end of the map, there's one valid path
        if (index === map.length) {
            // Store the result in the map before returning
            hashMap.set(`${index},${beamPosition}`, 1);
            return 1;
        }

        // If the beam hits a splitter, it can go left or right
        if (map[index][beamPosition] === '^') {
            const a = traverse(index + 1, beamPosition - 1);
            const b = traverse(index + 1, beamPosition + 1);

            // Store the result in the map before returning
            hashMap.set(`${index},${beamPosition}`, a + b);
            return a + b;
        } else {
            // If the beam continues straight down
            const ans = traverse(index + 1, beamPosition);

            // Store the result in the map before returning
            hashMap.set(`${index},${beamPosition}`, ans);
            return ans;
        }
    }

    // Answer for part 2
    console.log(traverse(1, starPosition));
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const map = lines.map((line) => line.split(''));

    /**
     * Given the cordinates, checks if the cell at the coordinate
     * has a roll.
     * @param {Number} x 
     * @param {Number} y 
     * @returns If the cell contains a roll
     */
    const check = (x, y) => {
        return (map[x]?.[y] === '@');
    }

    /**
     * Traverses the map and gives the list of rolls that can be
     * removed. 
     * @returns List of removable rolls's coordinates
     */
    const getRollsToBeRemoved = () => {
        const removableRolls = [];

        // Traverse the map
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
    
                // Check adjecent cells if current cell has a roll.
                if (map[i][j] === '@') {
                    // Counter for adjecent cell that has rolls.
                    let adj = 0;
                    
                    // Check all the neighbours
                    for (let x = i - 1; x <= i + 1; x++) {
                        for (let y = j - 1; y <= j + 1; y++) {

                            // Don't check current cell
                            if (x !== i || y !== j) {
                                // Increase counter when adjecent
                                // roll is found
                                adj += check(x, y) ? 1 : 0;
                            }
                        }
                    }
    
                    // If adjecent cells have less than 4 rolls
                    // then it can be removed.
                    if (adj < 4) {
                        removableRolls.push({ x: i, y: j });
                    }
                }
    
            }
        }

        // Return the list of removable rolls.
        return removableRolls;
    }

    // Total number of removable rolls.
    let total = 0;
    // Rolls removed in each round.
    let round = [];
    do {
        // Get the list of removable rolls.
        const removableRolls = getRollsToBeRemoved();

        // Exit looo if no rolls are found.
        if (removableRolls.length === 0) {
            break;
        }

        // Mark each cell where the rolls were removed.
        removableRolls.forEach(({x, y}) => {
            map[x][y] = 'x';
        });

        // Save count of rolls removed in each round.
        round.push(removableRolls.length);
        // Update the total count
        total += removableRolls.length;
    } while(true);

    // Answer to Part 1 is number of rolls removed
    // in the first round.
    console.log(round[0]);

    // Answer to Part 2 is total number of rolls removed.
    console.log(total);
});

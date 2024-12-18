/**
 * Resumes the standard input stream to start receiving data.
 */
process.stdin.resume();

/**
 * Sets the encoding for the standard input stream to 'utf8'.
 */
process.stdin.setEncoding('utf8');

/**
 * Event listener for 'data' event on the standard input stream.
 * Processes the input data, splits it into lines, and maps each line to an array of characters.
 * Then, it checks for specific patterns in the mapped data to solve the problem.
 * 
 * @param {string} chunk - The input data chunk.
 */
process.stdin.on('data', function (chunk) {
    // Split the input data into lines and filter out any empty lines
    const lines = chunk.toString().split('\n').filter(item => item);

    // Map each line to an array of characters
    const map = lines.map(line => line.split(''));

    // Define the directions to check for patterns (horizontal, vertical, and diagonal)
    const directions = [
        [[0, 0], [0, 1], [0, 2], [0, 3]], // Horizontal
        [[0, 0], [1, 0], [2, 0], [3, 0]], // Vertical
        [[0, 0], [1, 1], [2, 2], [3, 3]], // Diagonal (top-left to bottom-right)
        [[0, 3], [1, 2], [2, 1], [3, 0]], // Diagonal (top-right to bottom-left)
    ];

    /**
     * Retrieves the character at the specified coordinates in the map.
     * 
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @returns {string} The character at the specified coordinates, or an empty string if out of bounds.
     */
    const getPoint = (x, y) => {
        return map?.[x]?.[y] || '';
    };

    let count = 0;

    // Iterate over each cell in the map
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            // Check each direction for the pattern
            directions.forEach(d => {
                // Create a string from the characters in the current direction
                const str = [
                    getPoint(i + d[0][0], j + d[0][1]),
                    getPoint(i + d[1][0], j + d[1][1]),
                    getPoint(i + d[2][0], j + d[2][1]),
                    getPoint(i + d[3][0], j + d[3][1]),
                ].join('');
                // Check if the string matches 'XMAS' or 'SAMX'
                if (str === 'XMAS' || str === 'SAMX') {
                    count++;
                }
            });
        }
    }

    // Output the count of found patterns
    console.log(count);

    let count1 = 0;

    // Define additional patterns to check (diagonal patterns)
    const x = [
        [[0, 0], [1, 1], [2, 2]], // Diagonal (top-left to bottom-right)
        [[2, 0], [1, 1], [0, 2]]  // Diagonal (bottom-left to top-right)
    ];

    // Iterate over each cell in the map
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            // Create a string from the characters in the first diagonal pattern
            const str1 = [
                getPoint(i + x[0][0][0], j + x[0][0][1]),
                getPoint(i + x[0][1][0], j + x[0][1][1]),
                getPoint(i + x[0][2][0], j + x[0][2][1]),
            ].join('');
            
            // Create a string from the characters in the second diagonal pattern
            const str2 = [
                getPoint(i + x[1][0][0], j + x[1][0][1]),
                getPoint(i + x[1][1][0], j + x[1][1][1]),
                getPoint(i + x[1][2][0], j + x[1][2][1]),
            ].join('');
            
            // Check if both strings match 'MAS' or 'SAM'
            if ((str1 === 'MAS' || str1 === 'SAM') && (str2 === 'MAS' || str2 === 'SAM')) {
                count1++;
            }
        }
    }

    // Output the count of found patterns
    console.log(count1);
});

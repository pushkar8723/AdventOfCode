process.stdin.resume();
process.stdin.setEncoding('utf8');

// Used completely different approach for Part 2.
process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);

    // Create a matrix of characters
    const matrix = lines.map(line => line.split(''));
    // Transpose the matrix
    const transposed = [];
    for (let i = 0; i < matrix[0].length; i++) {
        transposed[i] = [];
        for (let j = 0; j < matrix.length; j++) {
            transposed[i][j] = matrix[j][i];
        }
    }
    
    // Reconstruct lines from transposed matrix
    const newInput = transposed.map(row => row.join('')).join('\n');
    // Split into groups by empty lines
    const newLines = newInput.split('\n').map(item => item.trim());

    const groups = [];
    let currentGroup = [];

    // Separate groups by empty lines
    newLines.forEach(line => {
        if (line !== '') {
            currentGroup.push(line);
        } else {
            groups.push(currentGroup);
            currentGroup = [];
        }
    });
    // Push the last group
    groups.push(currentGroup);

    // Initialize sum for final result
    let sum = 0;

    groups.forEach(group => {
        // Last character of first line is the operation
        const op = group[0][group[0].length - 1];
        // Remove the operation character from the first line
        group[0] = group[0].slice(0, -1);
        // Parse numbers in the group
        const numbers = group.map(str => parseInt(str.trim()));
        
        // Calculate result for this group based on operation
        let result = op === '+' ? 0 : 1;
        numbers.forEach(num => {
            if (op === '+') {
                result += num;
            } else {
                result *= num;
            }
        });

        // Add to final sum
        sum += result;
    });

    // Print final sum as answer to Part 2
    console.log(sum);
});

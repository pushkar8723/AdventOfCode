process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item).map(item => item.trim());
    // Write your code here
    // Last line contains operations
    const operations = lines[lines.length - 1].split(/\s+/);
    lines.splice(lines.length - 1, 1);

    // Get groups of numbers
    const groups = lines.map(line => line.split(/\s+/).map(i => parseInt(i, 10)));

    // Calculate results based on operations
    const results = operations.map((op, index) => {
        // If operation is +, initialize result to 0, else to 1
        let result = op === '+' ? 0 : 1;

        // For each group, apply the operation
        // If operation is +, add the number at index, else multiply
        for (let i = 0; i < groups.length; i++) {
            if (op === '+') {
                result += groups[i][index];
            } else {
                result *= groups[i][index];
            }
        }

        // Return the result for this operation
        return result;
    });

    // Sum of all results is answer to Part 1.
    console.log(results.reduce((acc, val) => acc + val, 0));
});

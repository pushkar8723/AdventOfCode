process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    // Filter out groups
    const lines = chunk.toString().split('\n\n');
    // Write your code here
    
    let max = 0;
    const cals = [];

    lines.forEach(line => {
        // Parse calories in each group
        const vals = line.split('\n').filter(i => i).map(i => parseInt(i));
        // Sum each calories
        const cal = vals.reduce((prev, curr) => prev + curr, 0);
        // Pust to calories list
        cals.push(cal);
        // Check if it is the max calorie (for part 1)
        if (cal > max) {
            max = cal;
        }
    });

    // Print part one
    console.log(max);

    // Sort calories' sum in decending order
    cals.sort((a,b) => b - a);

    // Print sum of top 3 calories
    console.log(cals[0] + cals[1] + cals[2]);
});

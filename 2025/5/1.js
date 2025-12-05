process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    // Split input into ranges and ingredients
    const [rangeStr, ingredientsStr] = chunk.toString().split('\n\n').filter(item => item);
    
    // Parse ranges and ingredients
    const ranges = rangeStr.split('\n').map(str => str.split('-').map(num => parseInt(num)));
    const ingredients = ingredientsStr.split('\n').filter(item => item).map(str => parseInt(str));

    // For Part 1, Check how many ingredients fall within any of the ranges
    let part1 = 0;
    ingredients.forEach(ingredient => {
        for (let i = 0; i < ranges.length; i++) {
            const [min, max] = ranges[i];
            if (ingredient >= min && ingredient <= max) {
                part1 += 1;
                break;
            }
        }
    });

    // Answer Part 1
    console.log(part1);

    // For Part 2, need to find total number of valid ingredient values
    let part2 = 0;
    // sort the ranges
    let sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

    /**
     * Returns merged range if overlapping or null if not.
     * @param {Number[]} a Range a
     * @param {Number[]} b Range b
     * @returns {Number[]|null} Merged range or null if not overlapping
     */
    const mergeRanges = (a, b) => {
        if (a[1] >= b[0]) {
            return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
        } else {
            return null;
        }
    }

    // Iterate over each range
    for (let i = 0; i < sortedRanges.length; i++) {
        for (let j = i + 1; j < sortedRanges.length; j++) {
            // Merge the two selected ranges
            const merged = mergeRanges(sortedRanges[i], sortedRanges[j]);

            // If merged, replace the first range and remove the second
            if (merged) {
                sortedRanges[i] = merged;
                sortedRanges.splice(j, 1);

                // Decrement j to recheck the new merged range with the next ranges
                j--;
            }
        }
    }

    // Calculate total number of valid ingredient values
    sortedRanges.forEach(([min, max]) => {
        part2 += (max - min + 1);
    });
    
    // Answer Part 2
    console.log(part2);
});

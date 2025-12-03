process.stdin.resume();
process.stdin.setEncoding('utf8');

/**
 * Select k maximum numbers from nums array to form the largest number
 * @param {Number[]} nums 
 * @param {Number} k 
 * @returns {Number} The largest number formed by k maximum numbers
 */
const max = (nums, k) => {
    /** Variable to hold the final value */
    let value = '';
    /** Current Max Number Index */
    let maxIdx = 0;

    // Select k numbers
    for (let i = k; i > 0; i--) {

        // Find the maximum number from max index to
        // end of array minus current index from left.
        for (let j = maxIdx + 1; j <= nums.length - i; j++) {
            // Update max index if current number is greater
            if (nums[j] > nums[maxIdx]) {
                maxIdx = j;
            }
        }
        
        // Append the found maximum number to value
        value += nums[maxIdx].toString();
        // Move max index to next position
        maxIdx += 1;
    }

    // Return the formed number as integer
    return parseInt(value);
}

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    /** Answer for part 1 */
    let sum1 = 0;
    /** Answer for part 2 */
    let sum2 = 0;

    lines.forEach(line => {
        // Parse input for battery
        const nums = line.split('').map(i => parseInt(i));
        // Select 2 numbers for part 1
        sum1 += max(nums, 2);
        // Select 12 numbers for part 2
        sum2 += max(nums, 12);
    });

    // Output answers
    console.log(sum1);
    console.log(sum2);
});

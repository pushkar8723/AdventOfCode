process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    /**
     * 
     * @param {Array<Number>} numbers 
     * @param {Number} result 
     * @param {Number} acc 
     * @returns 
     */
    const isEqual = (numbers, result, acc, concat = false) => {
        const curr = numbers.shift();
        const case1 = acc + curr;
        const case2 = acc * curr;
        const case3 = parseInt(acc + '' + curr);
        // console.log('>', acc, curr, case1, case2, case3, numbers, result);
        if (numbers.length === 0) {
            return (case1 === result || case2 === result || (concat && case3 === result));
        } else {
            return isEqual([...numbers], result, case1, concat) || isEqual([...numbers], result, case2, concat) || (concat && isEqual([...numbers], result, case3, concat));
        }
    }

    let ans1 = 0;
    lines.forEach(line => {
        const [[result], numbers] = line.split(':').map(item => item.split(' ').filter(i => i).map(Number));
        const first = numbers.shift();
        // console.log('\n-', result, [first, ...numbers]);
        if (isEqual(numbers, result, first)) {
            ans1 += result;
        };
    });
    console.log(ans1);

    let ans2 = 0;
    lines.forEach(line => {
        const [[result], numbers] = line.split(':').map(item => item.split(' ').filter(i => i).map(Number));
        const first = numbers.shift();
        // console.log('\n-', result, [first, ...numbers]);
        if (isEqual(numbers, result, first, true)) {
            // console.log(result);
            ans2 += result;
        };
    });
    console.log(ans2);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    function countChar(inputs) {
        const map = {
            a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0
        }
        inputs.forEach(item => {
            for (const char of item) {
                map[char]++;
            } 
        });
        return map;
    }

    let count = 0;
    let ans = 0;
    lines.forEach(line => {
        const [comb, input] = line.split(' | ');
        /**
         * Ans for part one. Since, the number of segments to be turned on
         * for 1, 4, 7 and 8 are unique (i.e., 2, 4, 3 and 7) we can simply
         * check the length of char in second part of input to identify
         * how many times 1, 4, 7 and 8 appear.
         */
        input.split(' ').forEach(item => {
            if ([2, 4, 3, 7].includes(item.length)) {
                count++;
            }
        });


        // Sort the given 10 number representation by length and use this
        // as source for our deduction.
        const source = comb.split(' ').sort((a, b) => a.length - b.length);

        // Count how many time each of these char have beed used in to
        // create all 10 numbers.
        const charCount = countChar(source);

        /**
         * For deduction we need to fix the position for each segment.
         * I am using following representation.
         *  0000
         * 1    2
         * 1    2
         *  3333
         * 4    5
         * 4    5
         *  6666
         */

        // Map of char to the segment position.
        const map = Array(7);

        /**
         * To figure out the position 0 we can just
         * check which character of 7 is not present in 1.
         */
        for (const char of source[1]) {
            if (!source[0].includes(char)) {
                map[0] = char;
            }
        }

        /**
         * Since segment 1 is used only 6 times in all 10 numbers,
         * segment 4 is used only 4 times, segment 5 is used 9 times,
         * we can uniquely identify them.
         * Then since segment 0 and segment 2 are used only 8 time and
         * we already know segment 0, we can also identify segment 2.
         */
        Object.keys(charCount).forEach(i => {
            if (charCount[i] === 6) {
                map[1] = i;
            } else if (charCount[i] === 4) {
                map[4] = i;
            } else if (charCount[i] === 9) {
                map[5] = i;
            } else if (charCount[i] === 8 && i !== map[0]) {
                map[2] = i;
            }
        });

        /**
         * Now we are only left with segment 3 and 6.
         * For segment 3 we can use character of digit 4.
         * In digit 4 we know all char except one which maps
         * to segment 3.
         */
        for (const char of source[2]) {
            if (charCount[char] === 7) {
                map[3] = char;
            }
        }

        /**
         * Now only one unknown remains, segment 6. Since, segment 6
         * and segment 3 are used 7 times and we already know segment 3
         * we can check all char of digit 8 and figure out the last segment.
         */
        for (const char of source[9]) {
            if (charCount[char] === 7 && char !== map[3]) {
                map[6] = char;
            }
        }

        /**
         * Next we need to figure out the digit in second part of input.
         * And since each digit can be represented by anagram of its segments.
         * We will generate a hash for each digit.
         * We will assign a prime number to each segment and then the hash would
         * be product of the digit's segment's prime number.
         * This way each digit will always generate a unique hash irrespective of
         * how the segments are arranged.
         */
        const primes = [2,3,5,7,11,13,17];
        const primeMap = {};
        map.forEach((char, index) => primeMap[char] = primes[index]);
        const numSegments = [
            [0,1,4,6,5,2],
            [2,5],
            [0,2,3,4,6],
            [0,2,3,5,6],
            [1,3,2,5],
            [0,1,3,5,6],
            [0,1,4,6,5,3],
            [0,2,5],
            [0,1,2,3,4,5,6],
            [3,1,0,2,5,6]
        ];
        const numHash = {}
        numSegments.forEach((segments, index) => {
            let product = 1;
            segments.forEach(segment => {
                const char = map[segment];
                product *= primeMap[char];
            });
            numHash[product] = index;
        });

        /**
         * Now we can simply figure out the current number using the hash.
         */
        let currNum = 0;
        input.split(' ').forEach((num, index) => {
            let product = 1;
            for (const char of num) {
                product *= primeMap[char];
            }
            currNum += Math.pow(10, 3 - index) * numHash[product];
        });

        /**
         * Add current humber to part 2 answer.
         */
        ans += currNum;
    });
    console.log(count);
    console.log(ans);
});

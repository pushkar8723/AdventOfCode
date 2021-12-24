process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let polymer = lines[0];
    const eq = new Map();
    for (let i = 1; i < lines.length; i++) {
        const [pair, out] = lines[i].split(' -> ');
        eq.set(pair, out);
    }

    const memo = new Map();

    const getElementCount = (pair, depth) => {
        if (memo.has(`${pair},${depth}`)) {
            return memo.get(`${pair},${depth}`);
        }

        const count = new Array(26);
        for (let i = 0; i < 26; i++) {
            count[i] = 0;
        }

        const newChar = eq.get(pair);
        count[newChar.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        
        if (depth === 1) {
            memo.set(`${pair},${depth}`, count);
            return count;
        }

        const subCountA = getElementCount(`${pair[0]}${newChar}`, depth - 1);
        const subCountB = getElementCount(`${newChar}${pair[1]}`, depth - 1);

        for (let i = 0; i < 26; i++) {
            count[i] = count[i] + subCountA[i] + subCountB[i];
        }

        memo.set(`${pair},${depth}`, count);
        return count;
    }

    const computeForSteps = (n) => {
        let count = new Array(26);
        for (let i = 0; i < 26; i++) {
            count[i] = 0;
        }
        let i = 0;
        for (; i < polymer.length - 1; i++) {
            count[polymer.charCodeAt(i) - 'A'.charCodeAt(0)]++;
            const subCount = getElementCount(`${polymer[i]}${polymer[i+1]}`, n);
            for (let x = 0; x < 26; x++) {
                count[x] += subCount[x];
            }
        }
        count[polymer.charCodeAt(i) - 'A'.charCodeAt(0)]++;
        count = count.filter(i => i > 0);
        return Math.max(...count) - Math.min(...count);
    }

    console.log(computeForSteps(10));
    console.log(computeForSteps(40));
});

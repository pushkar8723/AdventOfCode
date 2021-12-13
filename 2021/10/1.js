process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    let sum = 0;
    let autoCompleteScores = [];
    lines.forEach(line => {
        stack = [];
        const map = {
            '(': ')',
            '[': ']',
            '{': '}',
            '<': '>'
        };
        const pointsMap = {
            ')': 3,
            ']': 57,
            '}': 1197,
            '>': 25137
        }
        let corrupted = false;
        for (const char of line) {
            if (['(', '[', '{', '<'].includes(char)) {
                stack.push(char);
            } else {
                const openingChar = stack.pop();
                if (map[openingChar] !== char) {
                    // console.log(line, char);
                    sum += pointsMap[char];
                    corrupted = true;
                    break;
                }
            }
        }
        if (!corrupted) {
            const acPointsMap = {
                '(': 1,
                '[': 2,
                '{': 3,
                '<': 4
            };
            let acSum = 0;
            while (stack.length > 0) {
                const char = stack.pop();
                acSum = acSum * 5 + acPointsMap[char];
            }
            autoCompleteScores.push(acSum);
        }
    });
    console.log(sum);
    autoCompleteScores = autoCompleteScores.sort((a, b) => a - b);
    console.log(autoCompleteScores[Math.floor(autoCompleteScores.length/2)]);
});

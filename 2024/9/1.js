process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const digits = lines[0].split('').map(Number);
    let usedSpace = 0;
    const totalSpace = digits.reduce((acc, cur) => acc + cur, 0);

    const disk = new Array(totalSpace).fill('.');

    let id = 0;
    let curr = 0;
    for (let i = 0; i < digits.length; i++) {
        if (i % 2 === 0) {
            for (let j = 0; j < digits[i]; j++) {
                disk[curr] = id;
                usedSpace++;
                curr++;
            }
            id++;
        } else {
            curr += digits[i];
        }
    }

    let start = 0;
    let end = disk.length - 1;

    while (true) {
        while (disk[start] !== '.') {
            start++;
        }
        while (disk[end] === '.') {
            end--;
        }
        if (start < end) {
            disk[start] = disk[end];
            disk[end] = '.';
        } else {
            break;
        }
    }

    let ans1 = 0;
    for (let i = 0; i < usedSpace; i++) {
        ans1 += disk[i] * i;
    }
    console.log(ans1);
});

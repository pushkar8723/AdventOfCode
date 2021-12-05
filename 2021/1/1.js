process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    const input = lines.map(i => parseInt(i));
    let count = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i-1]) {
            count++;
        }
    }
    console.log(count);

    count = 0;
    for (let i = 3; i < input.length; i++) {
        if (input[i] > input[i-3]) {
            count++;
        }
    }
    console.log(count);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const commands = chunk.toString().split('\n').filter(item => item).map(i => i.split(' '));
    // Write your code here
    let horizontal = 0;
    let depth = 0;
    commands.forEach(cmd => {
        switch(cmd[0]) {
            case 'forward':
                horizontal += parseInt(cmd[1]);
                break;
            case 'up':
                depth -= parseInt(cmd[1]);
                break;
            case 'down':
                depth += parseInt(cmd[1]);
                break;
        }
    });
    console.log(horizontal * depth);

    horizontal = 0;
    depth = 0;
    let aim = 0;
    commands.forEach(cmd => {
        switch(cmd[0]) {
            case 'forward':
                horizontal += parseInt(cmd[1]);
                depth += aim * parseInt(cmd[1]);
                break;
            case 'up':
                aim -= parseInt(cmd[1]);
                break;
            case 'down':
                aim += parseInt(cmd[1]);
                break;
        }
    });
    console.log(horizontal * depth);
});

const intcode = require('../../2019/shared/intcode').default;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    const machine = new intcode(lines[0].split(',').map(i => parseInt(i)));
    let output = machine.exec();
    while(!output.done) {
        if (output.inputRequired) {
            console.log('input required');
            break;
        } else {
            process.stdout.write(String.fromCharCode(output.value));
            output = machine.exec();
        }
    }
});

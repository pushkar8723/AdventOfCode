process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    let cycle = 1;
    let x = 1;
    const values = new Map();

    lines.forEach(line => {
        if (line === 'noop') {
            values.set(cycle, x);
            cycle++;
        } else {
            const [op, v] = line.split(' ');
            values.set(cycle, x);
            cycle++;
            values.set(cycle, x);
            cycle++;
            x += parseInt(v);
        }
    });

    console.log(20*values.get(20) + 60*values.get(60) + 100*values.get(100) + 140*values.get(140) + 180*values.get(180) + 220*values.get(220));

    for (let j = 1; j <= 6; j++) {
        let str='';
        for (let i = 1; i <= 40; i++) {
            const spritePosition = values.get(40*(j - 1) + i);
            const position = i;
            if (position >= spritePosition && position <= spritePosition + 2) {
                str = `${str}#`;
            } else {
                str = `${str} `;
            }
        }
        console.log(str);
    }
});

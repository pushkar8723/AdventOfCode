process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here

    const moveTail = (h, t) => {
        const [tx, ty] = t;
        const dx = h[0] - tx;
        const dy = h[1] - ty;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        if (absDx === 0 && absDy > 1) {
            t = [tx, ty + (dy/absDy)];
        } else if (absDy === 0 && absDx > 1) {
            t = [tx + (dx/absDx), ty];
        } else if ((absDx === 2 && absDy === 1) || (absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 2)) {
            t = [tx + dx/absDx, ty + dy/absDy];
        }
        return t;
    }

    const simulateRope = (rope, d) => {
        const [hx, hy] = rope[0];
        switch(d) {
            case 'R':
                rope[0] = [hx, hy+1];
                break;
            case 'L':
                rope[0] = [hx, hy-1];
                break;
            case 'U':
                rope[0] = [hx+1, hy];
                break;
            case 'D':
                rope[0] = [hx-1, hy];
                break;
        }
        for (let n = 1; n < rope.length; n++) {
            rope[n] = moveTail(rope[n-1], rope[n]);
        }
    }

    const rope = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

    const part1 = new Set();
    const part2 = new Set();

    lines.forEach(line => {
        const [d, steps] = line.split(' ');
        for (let i  = 0; i < parseInt(steps); i++) {
            simulateRope(rope, d);
            part1.add(`${rope[1][0]},${rope[1][1]}`);
            part2.add(`${rope[9][0]},${rope[9][1]}`);
        }
    });
    console.log(part1.size);
    console.log(part2.size);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    
    let t = [0, 0];
    let h = [0, 0];

    const set = new Set();

    lines.forEach(line => {
        const [d, steps] = line.split(' ');
        // console.log(line);
        for (let i  = 0; i < parseInt(steps); i++) {
            const [hx, hy] = h;
            const [tx, ty] = t;
            switch(d) {
                case 'R':
                    h = [hx, hy+1];
                    break;
                case 'L':
                    h = [hx, hy-1];
                    break;
                case 'U':
                    h = [hx+1, hy];
                    break;
                case 'D':
                    h = [hx-1, hy];
                    break;
            }
            const dx = h[0] - tx;
            const dy = h[1] - ty;
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);
            if (absDx === 0 && absDy > 1) {
                t = [tx, ty + (dy/absDy)];
            } else if (absDy === 0 && absDx > 1) {
                t = [tx + (dx/absDx), ty];
            } else if ((absDx === 2 && absDy === 1) || (absDx === 1 && absDy === 2)) {
                t = [tx + dx/absDx, ty + dy/absDy];
            }
            set.add(`${t[0]},${t[1]}`);
            // console.log(h, t);
        }
    });
    console.log(set.size);
});

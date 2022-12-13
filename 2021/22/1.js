process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n').filter(item => item);
    // Write your code here
    // Found solution here https://www.reddit.com/r/adventofcode/comments/rlxhmg/comment/hqxczc4/?utm_source=share&utm_medium=web2x&context=3
    const regex = /(on|off) x=([-\d]+)..([-\d]+),y=([-\d]+)..([-\d]+),z=([-\d]+)..([-\d]+)/;
    let cuboids = lines.map(line => {
        return regex.exec(line).slice(1).map((i, idx) => idx > 0 ? parseInt(i) : (i === 'on' ? 1 : 0));
    });

    const solve = (cuboids) => {
        const intersection = (s, t) => {
            const mm = [(a, b) => -b, Math.max, Math.min, Math.max, Math.min, Math.max, Math.min];
            const n = [];
            for (let i = 0; i < 7; i++) {
                n.push(mm[i](s[i], t[i]));
            }
            return (n[1] > n[2] || n[3] > n[4] || n[5] > n[6]) ? null : n; 
        }
    
        const cores = [];
        for (const cuboid of cuboids) {
            const toadd = (cuboid[0] === 1) ? [cuboid] : [];
            for (const core of cores) {
                const inter = intersection(cuboid, core);
                if (inter) {
                    toadd.push(inter);
                }
            }
            cores.push(...toadd)
        }
    
        const countoncubes = (cores) => {
            let oncount = 0;
            for (const c of cores) {
                oncount += c[0] * (c[2]-c[1]+1) * (c[4]-c[3]+1) * (c[6]-c[5]+1);
            }
            return oncount;
        }
    
        return countoncubes(cores);
    }

    console.log(solve(cuboids.filter(i => (
        Math.abs(i[1]) <= 50 && Math.abs(i[2]) <= 50 &&
        Math.abs(i[3]) <= 50 && Math.abs(i[4]) <= 50 &&
        Math.abs(i[5]) <= 50 && Math.abs(i[6]) <= 50
    ))));
    console.log(solve(cuboids));
});
